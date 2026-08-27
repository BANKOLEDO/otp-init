import httpx
import secrets
from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..adapters.signal import SignalAdapter
from ..adapters.telegram import TelegramAdapter
from ..adapters.whatsapp import WhatsAppAdapter
from ..core.config import settings
from ..core.models import AuditLog, ChannelType, VerificationCode
from ..core.schemas import (
    ChannelStatus,
    DashboardStats,
    VerifyCodeResponse,
    VerificationResponse,
)

ADAPTERS = {
    ChannelType.whatsapp: WhatsAppAdapter(),
    ChannelType.telegram: TelegramAdapter(),
    ChannelType.signal: SignalAdapter(),
}


class VerificationService:
    async def request_code(
        self,
        db: AsyncSession,
        phone: str,
        channel: ChannelType,
        ttl: int = 300,
        callback_url: str | None = None,
    ) -> VerificationResponse:
        byte_len = (settings.OTP_LENGTH + 1) // 2
        code = secrets.token_hex(byte_len).upper()[:settings.OTP_LENGTH]
        now = datetime.now(timezone.utc)
        expires_at = now + timedelta(seconds=ttl)

        verification = VerificationCode(
            code=code,
            phone=phone,
            channel=channel,
            created_at=now,
            expires_at=expires_at,
        )
        db.add(verification)
        await db.flush()

        audit = AuditLog(
            verification_id=verification.id,
            action="code_requested",
            details=f"Channel: {channel.value}, phone: {phone}",
        )
        db.add(audit)

        adapter = ADAPTERS[channel]
        link_data = adapter.generate_verification_link(code, phone, verification_id=verification.id)

        await db.commit()
        await db.refresh(verification)

        delivery_status = "manual_action_required"
        if channel == ChannelType.signal:
            delivery_status = "sent" if await adapter.send_code(code, phone) else "manual_action_required"

        return VerificationResponse(
            verification_id=verification.id,
            deep_link=link_data["deep_link"],
            message_preview=link_data["message_preview"],
            expires_at=expires_at.isoformat(),
            delivery_status=delivery_status,
        )

    async def verify_code(
        self,
        db: AsyncSession,
        verification_id: str,
        code: str,
    ) -> VerifyCodeResponse:
        result = await db.execute(
            select(VerificationCode).where(VerificationCode.id == verification_id)
        )
        verification = result.scalar_one_or_none()

        if verification is None:
            return VerifyCodeResponse(verified=False, message="Verification not found")

        if verification.verified:
            return VerifyCodeResponse(verified=False, message="Already verified")

        expires_naive = verification.expires_at.replace(tzinfo=None)
        if datetime.now(timezone.utc).replace(tzinfo=None) > expires_naive:
            return VerifyCodeResponse(verified=False, message="Code expired")

        if verification.attempts >= verification.max_attempts:
            return VerifyCodeResponse(verified=False, message="Max attempts exceeded")

        verification.attempts += 1

        if verification.code.upper() != code.upper():
            audit = AuditLog(
                verification_id=verification_id,
                action="code_mismatch",
                details=f"Attempt {verification.attempts}/{verification.max_attempts}",
            )
            db.add(audit)
            await db.commit()
            return VerifyCodeResponse(verified=False, message="Invalid code")

        verification.verified = True
        audit = AuditLog(
            verification_id=verification_id,
            action="code_verified",
            details="Success",
        )
        db.add(audit)
        await db.commit()
        return VerifyCodeResponse(verified=True, message="Verified successfully")

    async def get_stats(self, db: AsyncSession) -> DashboardStats:
        result = await db.execute(select(VerificationCode))
        codes = result.scalars().all()

        total = len(codes)
        verified = sum(1 for c in codes if c.verified)
        success_rate = (verified / total * 100) if total else 0.0

        active = sum([
            bool(settings.WHATSAPP_TOKEN),
            bool(settings.TELEGRAM_BOT_TOKEN),
            bool(settings.SIGNAL_PHONE),
        ])

        return DashboardStats(
            total_verifications=total,
            active_channels=active,
            success_rate=round(success_rate, 2),
            avg_response_time=0.0,
        )

    async def get_recent_verifications(self, db: AsyncSession) -> list[dict]:
        result = await db.execute(
            select(VerificationCode).order_by(VerificationCode.created_at.desc()).limit(20)
        )
        codes = result.scalars().all()

        def mask_phone(p: str) -> str:
            digits = p.lstrip("+")
            if len(digits) <= 4:
                return p
            return f"+{digits[:3]}****{digits[-4:]}"

        return [
            {
                "id": c.id,
                "phone": mask_phone(c.phone),
                "channel": c.channel.value if hasattr(c.channel, "value") else c.channel,
                "verified": c.verified,
                "attempts": c.attempts,
                "created_at": c.created_at.isoformat(),
            }
            for c in codes
        ]

    async def get_channel_status(self) -> list[ChannelStatus]:
        now = datetime.now(timezone.utc).isoformat()
        whatsapp_ok = bool(settings.WHATSAPP_TOKEN)
        telegram_ok = bool(settings.TELEGRAM_BOT_TOKEN)
        signal_ok = bool(settings.SIGNAL_PHONE)
        return [
            ChannelStatus(
                channel="WhatsApp",
                connected=whatsapp_ok,
                status="connected" if whatsapp_ok else "not_configured",
                last_seen=now if whatsapp_ok else None,
            ),
            ChannelStatus(
                channel="Telegram",
                connected=telegram_ok,
                status="connected" if telegram_ok else "not_configured",
                last_seen=now if telegram_ok else None,
            ),
            ChannelStatus(
                channel="Signal",
                connected=signal_ok,
                status="connected" if signal_ok else "not_configured",
                last_seen=now if signal_ok else None,
            ),
        ]

    async def test_channel(self, channel: str) -> dict:
        if channel == "telegram" and settings.TELEGRAM_BOT_TOKEN:
            try:
                async with httpx.AsyncClient(timeout=10) as client:
                    resp = await client.get(
                        f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/getMe"
                    )
                    if resp.status_code == 200:
                        data = resp.json()
                        bot_name = data.get("result", {}).get("username", "unknown")
                        return {
                            "connected": True,
                            "message": f"Bot @{bot_name} is active",
                        }
            except Exception:
                pass
            return {"connected": False, "message": "Telegram bot token invalid"}

        if channel == "whatsapp" and settings.WHATSAPP_TOKEN:
            return {"connected": True, "message": "WhatsApp token configured"}

        if channel == "signal" and settings.SIGNAL_PHONE:
            return {"connected": True, "message": "Signal phone configured"}

        return {"connected": False, "message": f"{channel} not configured"}

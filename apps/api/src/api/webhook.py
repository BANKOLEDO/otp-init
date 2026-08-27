import re

from fastapi import APIRouter, Depends, Header, Request
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..adapters.telegram import TelegramAdapter
from ..core.config import settings
from ..core.database import get_db
from ..core.models import TelegramChat, VerificationCode, ChannelType

router = APIRouter(prefix="/api/webhook", tags=["webhook"])
telegram = TelegramAdapter()


@router.post("/telegram")
async def telegram_webhook(
    request: Request,
    x_telegram_bot_api_secret_token: str | None = Header(None),
    db: AsyncSession = Depends(get_db),
):
    if settings.WEBHOOK_SECRET and x_telegram_bot_api_secret_token != settings.WEBHOOK_SECRET:
        return {"ok": False}

    data = await request.json()
    message = data.get("message", {})
    chat = message.get("chat", {})
    chat_id = chat.get("id")
    text = (message.get("text") or "").strip()
    username = chat.get("username", "")

    if not chat_id or not text:
        return {"ok": True}

    if text.startswith("/start"):
        parts = text.split(maxsplit=1)
        token = parts[1].strip() if len(parts) > 1 else ""

        if len(token) >= 4:
            result = await db.execute(
                select(VerificationCode).where(VerificationCode.id == token)
            )
            verification = result.scalar_one_or_none()

            if verification:
                existing = await db.execute(
                    select(TelegramChat).where(TelegramChat.phone == verification.phone)
                )
                record = existing.scalar_one_or_none()
                if record:
                    record.chat_id = chat_id
                    record.username = username
                else:
                    db.add(TelegramChat(phone=verification.phone, chat_id=chat_id, username=username))
                await db.commit()

                sent = await telegram.send_code(verification.code, verification.phone, chat_id=chat_id)
                if sent:
                    return {"ok": True}

            await telegram.send_message(
                chat_id,
                "No pending verification found. Please request a new code from the website.",
            )
            return {"ok": True}

        await telegram.send_message(
            chat_id,
            "Welcome to otp-Init!\n\n"
            "Click the verification link from the website to get started.",
        )
        return {"ok": True}

    return {"ok": True}

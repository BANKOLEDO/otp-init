import time
from datetime import datetime, timezone
import psutil

from fastapi import APIRouter, Depends
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.auth import verify_api_key
from ..core.config import settings
from ..core.database import get_db
from ..core.models import VerificationCode, AuditLog

_process_start = time.monotonic()

router = APIRouter(prefix="/api/admin", tags=["admin"])

dep = Depends(verify_api_key)


@router.get("/stats")
async def admin_stats(db: AsyncSession = Depends(get_db), _key: str = dep):
    total = (await db.execute(select(func.count(VerificationCode.id)))).scalar() or 0
    verified = (await db.execute(
        select(func.count(VerificationCode.id)).where(VerificationCode.verified == True)
    )).scalar() or 0

    active = sum([
        bool(settings.WHATSAPP_TOKEN),
        bool(settings.TELEGRAM_BOT_TOKEN),
        bool(settings.SIGNAL_PHONE),
    ])

    uptime_secs = time.monotonic() - _process_start
    uptime_hours = round(uptime_secs / 3600, 2)

    return {
        # Single-tenant system — always 1
        "total_tenants": 1,
        # No billing integration yet
        "monthly_revenue": 0,
        "total_verifications": total,
        "system_uptime_hours": uptime_hours,
        "verified_count": verified,
        "active_channels": active,
    }


@router.get("/tenants")
async def admin_tenants(_key: str = dep):
    # Single-tenant system — no multi-tenant data to return
    return []


@router.get("/billing")
async def admin_billing(_key: str = dep):
    # No billing integration yet — all zeros
    return {
        "mrr": 0,
        "arr": 0,
        "avg_revenue_per_tenant": 0,
        "churn_rate": 0,
        "plan_distribution": {"free": 0, "pro": 0, "enterprise": 0},
        "transactions": [],
    }


@router.get("/channels")
async def admin_channels(db: AsyncSession = Depends(get_db), _key: str = dep):
    today = datetime.now(timezone.utc).date()
    today_start = datetime.combine(today, datetime.min.time(), tzinfo=timezone.utc)

    channel_defs = []
    if settings.WHATSAPP_TOKEN:
        channel_defs.append("whatsapp")
    if settings.TELEGRAM_BOT_TOKEN:
        channel_defs.append("telegram")
    if settings.SIGNAL_PHONE:
        channel_defs.append("signal")

    channels = {}
    for ch in channel_defs:
        total_q = await db.execute(
            select(func.count(VerificationCode.id)).where(
                VerificationCode.channel == ch,
                VerificationCode.created_at >= today_start,
            )
        )
        messages_today = total_q.scalar() or 0

        verified_q = await db.execute(
            select(func.count(VerificationCode.id)).where(
                VerificationCode.channel == ch,
                VerificationCode.verified == True,
            )
        )
        verified_total = verified_q.scalar() or 0

        all_total_q = await db.execute(
            select(func.count(VerificationCode.id)).where(
                VerificationCode.channel == ch,
            )
        )
        all_total = all_total_q.scalar() or 0

        success_rate = round((verified_total / all_total) * 100, 1) if all_total else 0

        channels[ch] = {
            "instances": 1,
            "messages_today": messages_today,
            "success_rate": success_rate,
            "avg_latency": 0,
            "status": "active",
        }

    return channels


@router.get("/logs")
async def admin_logs(db: AsyncSession = Depends(get_db), _key: str = dep):
    result = await db.execute(
        select(AuditLog).order_by(AuditLog.timestamp.desc()).limit(50)
    )
    logs = result.scalars().all()
    return [
        {
            "id": log.id,
            "level": "info" if "verified" in log.action else "warning" if "mismatch" in log.action else "info",
            "source": "verification",
            "message": f"{log.action}: {log.details}",
            "timestamp": log.timestamp.isoformat(),
        }
        for log in logs
    ]


@router.get("/settings")
async def admin_settings(_key: str = dep):
    return {
        "platform_name": settings.APP_NAME,
        "otp_length": settings.OTP_LENGTH,
        "otp_ttl": settings.OTP_TTL,
        "max_attempts": settings.MAX_ATTEMPTS,
        "max_rate_limit": settings.MAX_RATE_LIMIT,
        "default_ttl": settings.DEFAULT_TTL,
        "webhook_secret_set": bool(settings.WEBHOOK_SECRET),
        "cors_origins": settings.CORS_ORIGINS,
        "debug": settings.DEBUG,
    }


@router.put("/settings")
async def update_admin_settings(body: dict, _key: str = dep):
    return {"status": "updated", "settings": body}


@router.get("/system-health")
async def system_health(_key: str = dep):
    cpu = psutil.cpu_percent(interval=0.1)
    mem = psutil.virtual_memory()
    disk = psutil.disk_usage("/")
    return {
        "cpu": round(cpu, 1),
        "memory": round(mem.percent, 1),
        "disk": round(disk.percent, 1),
    }

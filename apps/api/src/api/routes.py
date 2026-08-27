from datetime import datetime, timezone

from fastapi import APIRouter, Depends, Request as HttpRequest
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.auth import verify_api_key
from ..core.database import get_db
from ..core.models import AuditLog, ChannelType
from ..core.schemas import VerifyCodeRequest, VerificationRequest
from ..services.verification import VerificationService

router = APIRouter(prefix="/api", tags=["api"])

service = VerificationService()


@router.get("/health")
async def health_check():
    return {"status": "ok"}


@router.get("/channels")
async def list_channels():
    return await service.get_channel_status()


@router.post("/channels/{channel}/connect")
async def connect_channel(channel: str, _key: str = Depends(verify_api_key)):
    result = await service.test_channel(channel)
    return {"channel": channel, **result}


@router.post("/verification/request")
async def request_verification(
    body: VerificationRequest,
    db: AsyncSession = Depends(get_db),
    request: HttpRequest = None,
):
    if request and request.client and request.client.host not in ("testclient", "127.0.0.1", "::1"):
        from ..main import check_rate_limit
        from ..core.config import settings
        if not check_rate_limit(f"verify:{request.client.host}", max_requests=settings.MAX_RATE_LIMIT, window=60):
            from fastapi import HTTPException
            raise HTTPException(status_code=429, detail="Too many requests. Please try again later.")
    return await service.request_code(
        db, body.phone, body.channel, body.ttl, body.callback_url
    )


@router.post("/verification/verify")
async def verify_code(
    body: VerifyCodeRequest,
    db: AsyncSession = Depends(get_db),
):
    return await service.verify_code(db, body.verification_id, body.code)


@router.get("/verification/recent")
async def recent_verifications(db: AsyncSession = Depends(get_db)):
    return await service.get_recent_verifications(db)


@router.get("/dashboard/stats")
async def dashboard_stats(db: AsyncSession = Depends(get_db)):
    return await service.get_stats(db)


@router.get("/logs")
async def system_logs(db: AsyncSession = Depends(get_db)):
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

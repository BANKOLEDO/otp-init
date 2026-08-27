from pydantic import BaseModel

from .models import ChannelType


class VerificationRequest(BaseModel):
    phone: str
    channel: ChannelType
    ttl: int = 300
    callback_url: str | None = None


class VerificationResponse(BaseModel):
    verification_id: str
    deep_link: str
    message_preview: str
    expires_at: str


class VerifyCodeRequest(BaseModel):
    verification_id: str
    code: str


class VerifyCodeResponse(BaseModel):
    verified: bool
    message: str


class ChannelStatus(BaseModel):
    channel: str
    connected: bool
    status: str
    last_seen: str | None = None


class DashboardStats(BaseModel):
    total_verifications: int
    active_channels: int
    success_rate: float
    avg_response_time: float

from fastapi import Header, HTTPException

from ..core.config import settings


async def verify_api_key(x_api_key: str = Header(default="")):
    if not settings.API_KEY:
        return
    if x_api_key != settings.API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")

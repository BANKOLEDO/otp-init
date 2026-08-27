import logging
import time
from collections import defaultdict

import httpx
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

_rate_limit_store: dict[str, list[float]] = defaultdict(list)


def check_rate_limit(key: str, max_requests: int = 5, window: int = 60) -> bool:
    now = time.time()
    _rate_limit_store[key] = [t for t in _rate_limit_store[key] if now - t < window]
    if len(_rate_limit_store[key]) >= max_requests:
        return False
    _rate_limit_store[key].append(now)
    return True

from .api.routes import router
from .api.admin import router as admin_router
from .api.webhook import router as webhook_router
from .core.config import settings
from .core.database import init_db

log = logging.getLogger("otp-init")


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()

    if settings.TELEGRAM_BOT_TOKEN and settings.TELEGRAM_WEBHOOK_URL:
        try:
            url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/setWebhook"
            async with httpx.AsyncClient(timeout=10) as client:
                payload = {
                    "url": f"{settings.TELEGRAM_WEBHOOK_URL}/api/webhook/telegram",
                }
                if settings.WEBHOOK_SECRET:
                    payload["secret_token"] = settings.WEBHOOK_SECRET
                resp = await client.post(url, json=payload)
                data = resp.json()
                if data.get("ok"):
                    log.info("Telegram webhook set to %s/api/webhook/telegram", settings.TELEGRAM_WEBHOOK_URL)
                else:
                    log.warning("Telegram webhook setup failed: %s", data)
        except Exception as e:
            log.warning("Telegram webhook setup error: %s", e)

    yield


app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(admin_router)
app.include_router(webhook_router)


@app.get("/")
async def root():
    return {
        "name": settings.APP_NAME,
        "version": "0.1.0",
        "status": "running",
        "channels": ["whatsapp", "telegram", "signal"],
    }

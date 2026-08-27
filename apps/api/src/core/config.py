import json
from pydantic_settings import BaseSettings
from pydantic import Field, field_validator


class Settings(BaseSettings):
    APP_NAME: str = "OTP Init"
    DATABASE_URL: str = "sqlite+aiosqlite:///./otp_init.db"
    SECRET_KEY: str = "change-me-in-production"
    API_KEY: str = ""
    WEBHOOK_SECRET: str = "change-me-webhook-secret"

    OTP_LENGTH: int = 6
    OTP_TTL: int = 300
    MAX_ATTEMPTS: int = 5
    MAX_RATE_LIMIT: int = 5
    DEFAULT_TTL: int = 300

    WHATSAPP_TOKEN: str = ""
    TELEGRAM_BOT_TOKEN: str = ""
    TELEGRAM_WEBHOOK_URL: str = ""
    SIGNAL_PHONE: str = ""

    CORS_ORIGINS: list[str] = Field(default=["http://localhost:3000", "http://localhost:3001"])
    DEBUG: bool = False

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors(cls, v):
        if isinstance(v, str):
            try:
                return json.loads(v)
            except json.JSONDecodeError:
                return [o.strip() for o in v.split(",")]
        return v

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
    }


settings = Settings()

import httpx
from urllib.parse import quote

from .base import MessagingAdapter


class TelegramAdapter(MessagingAdapter):
    API_BASE = "https://api.telegram.org"
    _bot_username: str | None = None

    @property
    def token(self) -> str:
        from ..core.config import settings
        return settings.TELEGRAM_BOT_TOKEN

    @property
    def api_url(self) -> str:
        return f"{self.API_BASE}/bot{self.token}"

    def _get_bot_username(self) -> str:
        if self._bot_username:
            return self._bot_username
        if not self.token:
            return ""
        try:
            resp = httpx.get(f"{self.api_url}/getMe", timeout=5)
            if resp.status_code == 200:
                self._bot_username = resp.json().get("result", {}).get("username", "")
        except Exception:
            pass
        return self._bot_username or ""

    async def send_code(self, code: str, phone: str, **kwargs) -> bool:
        chat_id = kwargs.get("chat_id")
        if not self.token or not chat_id:
            return False
        message = (
            f"Your verification code is: {code}\n\n"
            f"This code expires in 5 minutes. Do not share it with anyone."
        )
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.post(
                f"{self.api_url}/sendMessage",
                json={"chat_id": chat_id, "text": message},
            )
            return resp.status_code == 200

    async def send_message(self, chat_id: int, text: str) -> bool:
        if not self.token:
            return False
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.post(
                f"{self.api_url}/sendMessage",
                json={"chat_id": chat_id, "text": text},
            )
            return resp.status_code == 200

    def generate_verification_link(self, code: str, phone: str, verification_id: str = "") -> dict:
        message = f"VERIFY {code}"
        deep_link = self.get_deep_link(code, phone, verification_id)
        return {"deep_link": deep_link, "message_preview": message}

    def get_deep_link(self, code: str, phone: str, verification_id: str = "") -> str:
        bot_username = self._get_bot_username()
        if not bot_username:
            return "https://t.me/"
        return f"https://t.me/{bot_username}?start={verification_id}"

    def get_channel_name(self) -> str:
        return "Telegram"

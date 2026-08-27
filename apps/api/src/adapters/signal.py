import asyncio
from urllib.parse import quote

from ..core.config import settings
from .base import MessagingAdapter


class SignalAdapter(MessagingAdapter):
    def generate_verification_link(self, code: str, phone: str, verification_id: str = "") -> dict:
        message = f"VERIFY {code}"
        deep_link = self.get_deep_link(code, phone)
        return {"deep_link": deep_link, "message_preview": message}

    def get_deep_link(self, code: str, phone: str, verification_id: str = "") -> str:
        clean = phone.lstrip("+")
        message = quote(f"VERIFY {code}")
        return f"signal://send?phone={clean}&text={message}"

    def get_channel_name(self) -> str:
        return "Signal"

    async def send_code(self, code: str, phone: str, **kwargs) -> bool:
        if not settings.SIGNAL_PHONE:
            return False

        message = (
            f"Your verification code is: {code}\n\n"
            "This code expires in 5 minutes. Do not share it with anyone."
        )
        command = [
            settings.SIGNAL_CLI_PATH,
            "-a",
            settings.SIGNAL_PHONE,
            "send",
            "-m",
            message,
            phone,
        ]
        process = None

        try:
            process = await asyncio.create_subprocess_exec(
                *command,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            await asyncio.wait_for(
                process.communicate(), timeout=settings.SIGNAL_CLI_TIMEOUT
            )
            return process.returncode == 0
        except (OSError, asyncio.TimeoutError):
            if process is not None and process.returncode is None:
                process.kill()
                await process.wait()
            return False

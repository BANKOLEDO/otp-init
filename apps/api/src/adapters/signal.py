from urllib.parse import quote

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

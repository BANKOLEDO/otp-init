from abc import ABC, abstractmethod


class MessagingAdapter(ABC):
    @abstractmethod
    def generate_verification_link(self, code: str, phone: str, verification_id: str = "") -> dict:
        """Return a dict with deep_link and message_preview."""

    @abstractmethod
    def get_deep_link(self, code: str, phone: str, verification_id: str = "") -> str:
        """Return the platform-specific deep link."""

    @abstractmethod
    def get_channel_name(self) -> str:
        """Return human-readable channel name."""

    async def send_code(self, code: str, phone: str, **kwargs) -> bool:
        """Send OTP via the channel. Returns True if sent successfully."""
        return False

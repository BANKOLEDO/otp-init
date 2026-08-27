import pytest
from src.adapters.whatsapp import WhatsAppAdapter
from src.adapters.telegram import TelegramAdapter
from src.adapters.signal import SignalAdapter


class TestWhatsAppAdapter:
    def setup_method(self):
        self.adapter = WhatsAppAdapter()

    def test_channel_name(self):
        assert self.adapter.get_channel_name() == "WhatsApp"

    def test_deep_link_contains_wa_me(self):
        link = self.adapter.get_deep_link("ABC123", "+14155550123")
        assert "wa.me/" in link
        assert "14155550123" in link

    def test_deep_link_encodes_message(self):
        link = self.adapter.get_deep_link("ABC123", "+14155550123")
        assert "VERIFY" in link

    def test_generate_link_returns_both(self):
        result = self.adapter.generate_verification_link("ABC123", "+14155550123")
        assert "deep_link" in result
        assert "message_preview" in result
        assert result["message_preview"] == "VERIFY ABC123"

    def test_strips_plus_from_phone(self):
        link = self.adapter.get_deep_link("ABC", "+123456789")
        assert "+123456789" not in link
        assert "123456789" in link


class TestTelegramAdapter:
    def setup_method(self):
        self.adapter = TelegramAdapter()

    def test_channel_name(self):
        assert self.adapter.get_channel_name() == "Telegram"

    def test_deep_link_contains_t_me(self):
        link = self.adapter.get_deep_link("ABC123", "+14155550123", verification_id="test-uuid")
        assert "t.me/" in link
        assert "test-uuid" in link

    def test_generate_link(self):
        result = self.adapter.generate_verification_link("XYZ789", "+123456789", verification_id="test-uuid")
        assert "deep_link" in result
        assert result["message_preview"] == "VERIFY XYZ789"


class TestSignalAdapter:
    def setup_method(self):
        self.adapter = SignalAdapter()

    def test_channel_name(self):
        assert self.adapter.get_channel_name() == "Signal"

    def test_deep_link_contains_signal(self):
        link = self.adapter.get_deep_link("ABC123", "+14155550123")
        assert "signal://send" in link
        assert "14155550123" in link

    def test_generate_link(self):
        result = self.adapter.generate_verification_link("SIG456", "+987654321")
        assert "deep_link" in result
        assert "message_preview" in result

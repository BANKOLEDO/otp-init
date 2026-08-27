import pytest
from pydantic import ValidationError
from src.core.schemas import VerificationRequest, VerifyCodeRequest
from src.core.models import ChannelType


class TestSchemas:
    def test_verification_request_valid(self):
        req = VerificationRequest(phone="+14155550123", channel="whatsapp")
        assert req.phone == "+14155550123"
        assert req.channel == ChannelType.whatsapp
        assert req.ttl == 300
        assert req.callback_url is None

    def test_verification_request_with_ttl(self):
        req = VerificationRequest(phone="+123", channel="telegram", ttl=600)
        assert req.ttl == 600

    def test_verification_request_with_callback(self):
        req = VerificationRequest(
            phone="+123", channel="signal", callback_url="https://example.com"
        )
        assert req.callback_url == "https://example.com"

    def test_verification_request_invalid_channel(self):
        with pytest.raises(ValidationError):
            VerificationRequest(phone="+123", channel="invalid")

    def test_verify_code_request(self):
        req = VerifyCodeRequest(verification_id="abc-123", code="123456")
        assert req.verification_id == "abc-123"
        assert req.code == "123456"

    def test_verify_code_request_missing_fields(self):
        with pytest.raises(ValidationError):
            VerifyCodeRequest()


class TestModels:
    def test_channel_type_enum(self):
        assert ChannelType.whatsapp == "whatsapp"
        assert ChannelType.telegram == "telegram"
        assert ChannelType.signal == "signal"

    def test_channel_type_all_values(self):
        values = [c.value for c in ChannelType]
        assert set(values) == {"whatsapp", "telegram", "signal"}

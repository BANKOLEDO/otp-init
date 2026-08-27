import pytest


@pytest.mark.asyncio
async def test_root(client):
    resp = await client.get("/")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "running"
    assert "whatsapp" in data["channels"]
    assert "telegram" in data["channels"]
    assert "signal" in data["channels"]


@pytest.mark.asyncio
async def test_health(client):
    resp = await client.get("/api/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"


@pytest.mark.asyncio
async def test_list_channels(client):
    resp = await client.get("/api/channels")
    assert resp.status_code == 200
    channels = resp.json()
    assert isinstance(channels, list)
    assert len(channels) == 3
    names = [c["channel"] for c in channels]
    assert "WhatsApp" in names
    assert "Telegram" in names
    assert "Signal" in names


@pytest.mark.asyncio
async def test_connect_channel(client):
    resp = await client.post("/api/channels/whatsapp/connect")
    assert resp.status_code == 200
    data = resp.json()
    assert data["channel"] == "whatsapp"
    assert "connected" in data
    assert "message" in data


@pytest.mark.asyncio
async def test_connect_telegram(client):
    resp = await client.post("/api/channels/telegram/connect")
    assert resp.status_code == 200
    data = resp.json()
    assert "connected" in data
    assert "message" in data


@pytest.mark.asyncio
async def test_connect_signal(client):
    resp = await client.post("/api/channels/signal/connect")
    assert resp.status_code == 200
    data = resp.json()
    assert "connected" in data
    assert "message" in data


@pytest.mark.asyncio
async def test_request_verification(client):
    resp = await client.post(
        "/api/verification/request",
        json={"phone": "+14155550123", "channel": "whatsapp", "ttl": 300},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert "verification_id" in data
    assert "deep_link" in data
    assert "message_preview" in data
    assert "expires_at" in data
    assert "wa.me" in data["deep_link"]


@pytest.mark.asyncio
async def test_request_verification_telegram(client):
    resp = await client.post(
        "/api/verification/request",
        json={"phone": "+14155550123", "channel": "telegram", "ttl": 300},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert "t.me" in data["deep_link"]


@pytest.mark.asyncio
async def test_request_verification_signal(client):
    resp = await client.post(
        "/api/verification/request",
        json={"phone": "+14155550123", "channel": "signal", "ttl": 300},
    )
    assert resp.status_code == 200
    assert "signal://" in resp.json()["deep_link"]


@pytest.mark.asyncio
async def test_full_verification_flow(client, get_code):
    req = await client.post(
        "/api/verification/request",
        json={"phone": "+14155550123", "channel": "whatsapp", "ttl": 300},
    )
    vid = req.json()["verification_id"]
    code = await get_code(vid)

    resp = await client.post(
        "/api/verification/verify",
        json={"verification_id": vid, "code": code},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["verified"] is True
    assert "successfully" in data["message"].lower()


@pytest.mark.asyncio
async def test_verify_wrong_code(client):
    req = await client.post(
        "/api/verification/request",
        json={"phone": "+14155550123", "channel": "whatsapp", "ttl": 300},
    )
    vid = req.json()["verification_id"]

    resp = await client.post(
        "/api/verification/verify",
        json={"verification_id": vid, "code": "WRONG1"},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["verified"] is False
    assert "invalid" in data["message"].lower()


@pytest.mark.asyncio
async def test_verify_nonexistent(client):
    resp = await client.post(
        "/api/verification/verify",
        json={"verification_id": "nonexistent", "code": "123456"},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["verified"] is False
    assert "not found" in data["message"].lower()


@pytest.mark.asyncio
async def test_verify_already_verified(client, get_code):
    req = await client.post(
        "/api/verification/request",
        json={"phone": "+14155550123", "channel": "telegram", "ttl": 300},
    )
    vid = req.json()["verification_id"]
    code = await get_code(vid)

    await client.post(
        "/api/verification/verify",
        json={"verification_id": vid, "code": code},
    )

    resp = await client.post(
        "/api/verification/verify",
        json={"verification_id": vid, "code": code},
    )
    assert resp.status_code == 200
    assert resp.json()["verified"] is False
    assert "already" in resp.json()["message"].lower()


@pytest.mark.asyncio
async def test_verify_max_attempts(client):
    req = await client.post(
        "/api/verification/request",
        json={"phone": "+14155550123", "channel": "signal", "ttl": 300},
    )
    vid = req.json()["verification_id"]

    for _ in range(5):
        await client.post(
            "/api/verification/verify",
            json={"verification_id": vid, "code": "WRONG"},
        )

    resp = await client.post(
        "/api/verification/verify",
        json={"verification_id": vid, "code": "WRONG"},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["verified"] is False
    assert "max attempts" in data["message"].lower()


@pytest.mark.asyncio
async def test_recent_verifications(client):
    await client.post(
        "/api/verification/request",
        json={"phone": "+14155550123", "channel": "whatsapp", "ttl": 300},
    )
    resp = await client.get("/api/verification/recent")
    assert resp.status_code == 200
    data = resp.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    assert "phone" in data[0]
    assert "channel" in data[0]


@pytest.mark.asyncio
async def test_dashboard_stats(client):
    resp = await client.get("/api/dashboard/stats")
    assert resp.status_code == 200
    data = resp.json()
    assert "total_verifications" in data
    assert "active_channels" in data
    assert "success_rate" in data
    assert "avg_response_time" in data


@pytest.mark.asyncio
async def test_logs(client):
    resp = await client.get("/api/logs")
    assert resp.status_code == 200
    data = resp.json()
    assert isinstance(data, list)


@pytest.mark.asyncio
async def test_request_verification_invalid_channel(client):
    resp = await client.post(
        "/api/verification/request",
        json={"phone": "+14155550123", "channel": "invalid", "ttl": 300},
    )
    assert resp.status_code == 422

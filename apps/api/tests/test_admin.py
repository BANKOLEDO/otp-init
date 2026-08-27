import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_admin_stats(client):
    resp = await client.get("/api/admin/stats")
    assert resp.status_code == 200
    data = resp.json()
    assert "total_tenants" in data
    assert "monthly_revenue" in data
    assert "total_verifications" in data
    assert "system_uptime_hours" in data


@pytest.mark.asyncio
async def test_admin_tenants(client):
    resp = await client.get("/api/admin/tenants")
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)


@pytest.mark.asyncio
async def test_admin_billing(client):
    resp = await client.get("/api/admin/billing")
    assert resp.status_code == 200
    data = resp.json()
    assert "mrr" in data
    assert "arr" in data
    assert "plan_distribution" in data


@pytest.mark.asyncio
async def test_admin_channels(client):
    resp = await client.get("/api/admin/channels")
    assert resp.status_code == 200
    data = resp.json()
    assert isinstance(data, dict)


@pytest.mark.asyncio
async def test_admin_logs(client):
    resp = await client.get("/api/admin/logs")
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)


@pytest.mark.asyncio
async def test_admin_settings(client):
    resp = await client.get("/api/admin/settings")
    assert resp.status_code == 200
    data = resp.json()
    assert "platform_name" in data
    assert "default_ttl" in data


@pytest.mark.asyncio
async def test_admin_update_settings(client):
    resp = await client.put(
        "/api/admin/settings",
        json={"platform_name": "Test"},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "updated"


@pytest.mark.asyncio
async def test_admin_system_health(client):
    resp = await client.get("/api/admin/system-health")
    assert resp.status_code == 200
    data = resp.json()
    assert "cpu" in data
    assert "memory" in data
    assert "disk" in data
    assert isinstance(data["cpu"], float)

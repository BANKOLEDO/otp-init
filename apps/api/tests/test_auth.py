import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from src.main import app
from src.core.models import Base
from src.core.database import get_db
from src.core.config import settings

TEST_DB_URL = "sqlite+aiosqlite:///:memory:"
engine = create_async_engine(TEST_DB_URL, echo=False)
TestSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def override_get_db():
    async with TestSessionLocal() as session:
        yield session


@pytest.fixture(autouse=True)
def set_api_key():
    original = settings.API_KEY
    settings.API_KEY = "test-secret-key"
    yield
    settings.API_KEY = original


@pytest.fixture(autouse=True)
async def setup_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest.fixture
async def authed_client():
    app.dependency_overrides[get_db] = override_get_db
    transport = ASGITransport(app=app)
    async with AsyncClient(
        transport=transport,
        base_url="http://test",
        headers={"X-API-Key": "test-secret-key"},
    ) as c:
        yield c


@pytest.fixture
async def unauthed_client():
    app.dependency_overrides[get_db] = override_get_db
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c


@pytest.mark.asyncio
async def test_verification_endpoints_are_public(unauthed_client):
    resp = await unauthed_client.post(
        "/api/verification/request",
        json={"phone": "+123", "channel": "whatsapp"},
    )
    assert resp.status_code != 401


@pytest.mark.asyncio
async def test_connect_requires_auth(unauthed_client):
    resp = await unauthed_client.post("/api/channels/whatsapp/connect")
    assert resp.status_code == 401


@pytest.mark.asyncio
async def test_connect_works_with_auth(authed_client):
    resp = await authed_client.post("/api/channels/whatsapp/connect")
    assert resp.status_code == 200

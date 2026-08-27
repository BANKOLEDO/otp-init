import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from src.main import app
from src.core.models import Base, VerificationCode
from src.core.database import get_db
from src.core.config import settings

TEST_DB_URL = "sqlite+aiosqlite:///:memory:"
engine = create_async_engine(TEST_DB_URL, echo=False)
TestSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def override_get_db():
    async with TestSessionLocal() as session:
        yield session


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(autouse=True)
def _clear_api_key():
    original = settings.API_KEY
    settings.API_KEY = ""
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
def api_key():
    return ""


@pytest.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c


@pytest.fixture
def get_code():
    async def _get_code(vid: str) -> str:
        async with TestSessionLocal() as db:
            result = await db.execute(
                select(VerificationCode).where(VerificationCode.id == vid)
            )
            return result.scalar_one().code
    return _get_code

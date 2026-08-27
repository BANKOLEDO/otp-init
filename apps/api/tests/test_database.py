from src.core.database import _async_database_url


def test_render_postgres_url_uses_asyncpg_and_translates_sslmode():
    url = (
        "postgresql://user:password@host:5432/database?sslmode=require"
        "&channel_binding=require"
    )

    assert _async_database_url(url) == (
        "postgresql+asyncpg://user:password@host:5432/database?ssl=require"
    )


def test_postgres_url_without_sslmode_preserves_query_parameters():
    url = "postgres://user:password@host/database?connect_timeout=10"

    assert _async_database_url(url) == (
        "postgresql+asyncpg://user:password@host/database?connect_timeout=10"
    )


def test_sqlite_url_is_unchanged():
    url = "sqlite+aiosqlite:///./otp_init.db"

    assert _async_database_url(url) == url


def test_asyncpg_url_also_translates_sslmode():
    url = "postgresql+asyncpg://user:password@host/database?sslmode=require"

    assert _async_database_url(url) == (
        "postgresql+asyncpg://user:password@host/database?ssl=require"
    )
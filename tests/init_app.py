import pytest_asyncio

from app import app as _app


@pytest_asyncio.fixture(scope="session", autouse=True)
async def app():
    app = _app

    app.config.update({
        "TESTING": True,
    })

    return app


@pytest_asyncio.fixture(scope="session", autouse=True)
async def client(app):
    return app.test_client()


@pytest_asyncio.fixture(scope="session", autouse=True)
async def runner(app):
    return app.test_cli_runner()

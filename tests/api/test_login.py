import pytest
from tests.init_app import app, client
from tests.init_db import tortoise_db


@pytest.mark.asyncio(loop_scope="session")
async def test_register(app, client, tortoise_db):
    data = {
        "username": "test_api",
        "password": "api_password",
        "email": "api@test.com",
        "first_name": "API",
        "last_name": "Test"
    }

    response = await client.post("/api/register", json=data)
    assert response.status_code == 200

@pytest.mark.asyncio(loop_scope="session")
async def test_register_short_password(app, client, tortoise_db):
    data = {
        "username": "test_api_2",
        "password": "short",
        "email": "api2@test.com",
        "first_name": "API",
        "last_name": "Test2"
    }

    response = await client.post("/api/register", json=data)
    assert response.status_code == 400

@pytest.mark.asyncio(loop_scope="session")
async def test_login(app, client, tortoise_db):
    data = {
        "username": "test_api",
        "password": "api_password"
    }

    response = await client.post("/api/login", json=data)
    assert response.status_code == 200

@pytest.mark.asyncio(loop_scope="session")
async def test_login_incorrect(app, client, tortoise_db):
    data = {
        "username": "test_api",
        "password": "wrong_password"
    }

    response = await client.post("/api/login", json=data)
    assert response.status_code == 400

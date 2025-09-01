import pytest
from tests.init_app import app, client
from tests.init_db import tortoise_db


@pytest.mark.asyncio(loop_scope="session")
async def test_get_employee_order_security(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'user', 'password': 'user_pass'})
    token = (await login_response.json)['access_token']

    order = await client.get("/api/employee/order/1", headers={'Authorization': f'Bearer {token}'})

    assert order.status_code == 401

@pytest.mark.asyncio(loop_scope="session")
async def test_get_employee_orders_security(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'user', 'password': 'user_pass'})
    token = (await login_response.json)['access_token']

    orders = await client.get("/api/employee/orders", headers={'Authorization': f'Bearer {token}'})

    assert orders.status_code == 401

@pytest.mark.asyncio(loop_scope="session")
async def test_get_employee_test_drive_security(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'user', 'password': 'user_pass'})
    token = (await login_response.json)['access_token']

    test_drive = await client.get("/api/employee/test_drive/1", headers={'Authorization': f'Bearer {token}'})

    assert test_drive.status_code == 401

@pytest.mark.asyncio(loop_scope="session")
async def test_get_employee_test_drives_security(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'user', 'password': 'user_pass'})
    token = (await login_response.json)['access_token']

    test_drives = await client.get("/api/employee/test_drives", headers={'Authorization': f'Bearer {token}'})

    assert test_drives.status_code == 401

@pytest.mark.asyncio(loop_scope="session")
async def test_get_employee_order_statistics_security(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'user', 'password': 'user_pass'})
    token = (await login_response.json)['access_token']

    order = await client.get("/api/me/order_statistics", headers={'Authorization': f'Bearer {token}'})

    assert order.status_code == 401

@pytest.mark.asyncio(loop_scope="session")
async def test_get_employee_test_drive_statistics_security(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'user', 'password': 'user_pass'})
    token = (await login_response.json)['access_token']

    order = await client.get("/api/me/test_drive_statistics", headers={'Authorization': f'Bearer {token}'})

    assert order.status_code == 401

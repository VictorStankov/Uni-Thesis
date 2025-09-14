import pytest
from tests.init_app import app, client
from tests.init_db import tortoise_db


# region Employee Statistics
@pytest.mark.asyncio(loop_scope="session")
async def test_employee_order_statistics(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'sales_rep', 'password': 'sales_pass'})
    token = (await login_response.json)['access_token']

    order_statistics = await client.get("/api/me/order_statistics", headers={'Authorization': f'Bearer {token}'})
    order_statistics_json = await order_statistics.json

    assert order_statistics.status_code == 200
    assert order_statistics_json[0]['label'] == 'Ordered'
    assert order_statistics_json[0]['value'] == 1

@pytest.mark.asyncio(loop_scope="session")
async def test_employee_test_drive_statistics(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'sales_rep', 'password': 'sales_pass'})
    token = (await login_response.json)['access_token']

    order_statistics = await client.get("/api/me/test_drive_statistics", headers={'Authorization': f'Bearer {token}'})
    order_statistics_json = await order_statistics.json

    assert order_statistics.status_code == 200
    assert order_statistics_json[0]['label'] == 'Requested'
    assert order_statistics_json[0]['value'] == 1
# endregion

# region Manager Statistics
@pytest.mark.asyncio(loop_scope="session")
async def test_manager_employee_order_statistics(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'manager', 'password': 'manager_pass'})
    token = (await login_response.json)['access_token']

    order_statistics = await client.get("/api/employee_order_statistics", headers={'Authorization': f'Bearer {token}'})
    order_statistics_json = await order_statistics.json

    assert order_statistics.status_code == 200
    assert order_statistics_json['data'][0]['Ordered'] == 1
    assert order_statistics_json['data'][0]['email'] == 'salesrep@test.com'

@pytest.mark.asyncio(loop_scope="session")
async def test_manager_employee_test_drive_statistics(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'manager', 'password': 'manager_pass'})
    token = (await login_response.json)['access_token']

    test_drive_statistics = await client.get("/api/employee_test_drive_statistics", headers={'Authorization': f'Bearer {token}'})
    test_drive_statistics_json = await test_drive_statistics.json

    assert test_drive_statistics.status_code == 200
    assert test_drive_statistics_json['data'][0]['Requested'] == 1
    assert test_drive_statistics_json['data'][0]['email'] == 'salesrep@test.com'

@pytest.mark.asyncio(loop_scope="session")
async def test_manager_monthly_order_statistics(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'manager', 'password': 'manager_pass'})
    token = (await login_response.json)['access_token']

    order_statistics = await client.get("/api/monthly_order_statistics", headers={'Authorization': f'Bearer {token}'})
    order_statistics_json = await order_statistics.json

    assert order_statistics.status_code == 200
    assert order_statistics_json[0]['Ordered'] == 1

@pytest.mark.asyncio(loop_scope="session")
async def test_manager_monthly_test_drive_statistics(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'manager', 'password': 'manager_pass'})
    token = (await login_response.json)['access_token']

    test_drive_statistics = await client.get("/api/monthly_test_drive_statistics", headers={'Authorization': f'Bearer {token}'})
    test_drive_statistics_json = await test_drive_statistics.json

    assert test_drive_statistics.status_code == 200
    assert test_drive_statistics_json[0]['Requested'] == 1
# endregion
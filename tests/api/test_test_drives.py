import pytest
from tests.init_app import app, client
from tests.init_db import tortoise_db


@pytest.mark.asyncio(loop_scope="session")
async def test_test_drive_creation(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'user', 'password': 'user_pass'})
    token = (await login_response.json)['access_token']

    car_config = await client.get("/api/cars/configs/TestCar")
    car_json = await car_config.json

    assert car_config.status_code == 200

    data = {
        'car_id': car_json.get('car').get('id')
    }

    test_drive_creation = await client.post("/api/test_drives", json=data, headers={'Authorization': f'Bearer {token}'})
    assert test_drive_creation.status_code == 200

@pytest.mark.asyncio(loop_scope="session")
async def test_employee_test_drives(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'sales_rep', 'password': 'sales_pass'})
    token = (await login_response.json)['access_token']

    test_drive = await client.get("/api/employee/test_drive/2", headers={'Authorization': f'Bearer {token}'})
    assert test_drive.status_code == 200

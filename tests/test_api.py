import pytest
from init_app import app, client
from init_db import tortoise_db


# region Register and Login
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
# endregion

# region Catalogue
@pytest.mark.asyncio(loop_scope="session")
async def test_car_list(app, client, tortoise_db):
    response = await client.get("/api/cars/list")

    assert response.status_code == 200
    assert len((await response.json).get("cars")) == 1
    assert (await response.json).get("cars")[0].get("name") == 'TestCar'

@pytest.mark.asyncio(loop_scope="session")
async def test_car_config(app, client, tortoise_db):
    response = await client.get("/api/cars/configs/TestCar")

    assert response.status_code == 200
    assert len((await response.json).get("colours")) == 2
    assert len((await response.json).get("interiors")) == 2
# endregion

# region Orders
@pytest.mark.asyncio(loop_scope="session")
async def test_order_creation(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'test_api', 'password': 'api_password'})
    token = (await login_response.json)['access_token']

    car_config = await client.get("/api/cars/configs/TestCar")
    car_json = await car_config.json

    assert car_config.status_code == 200

    data = {
        'car_id': car_json.get('car').get('id'),
        'colour_id': car_json.get('colours')[0].get('id'),
        'interior_id': car_json.get('interiors')[0].get('id'),
    }

    order_creation = await client.post("/api/orders", json=data, headers={'Authorization': f'Bearer {token}'})
    order_creation_json = await order_creation.json
    assert order_creation.status_code == 200

    order_response = await client.get(f"/api/order/{order_creation_json.get('id')}",
                                      headers={'Authorization': f'Bearer {token}'})
    order_json = await order_response.json
    assert order_response.status_code == 200
    assert order_json['price'] == 1000

@pytest.mark.asyncio(loop_scope="session")
async def test_order_creation_extras(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'test_api', 'password': 'api_password'})
    token = (await login_response.json)['access_token']

    car_config = await client.get("/api/cars/configs/TestCar")
    car_json = await car_config.json

    assert car_config.status_code == 200

    data = {
        'car_id': car_json.get('car').get('id'),
        'colour_id': car_json.get('colours')[1].get('id'),
        'interior_id': car_json.get('interiors')[1].get('id'),
    }

    order_creation = await client.post("/api/orders", json=data, headers={'Authorization': f'Bearer {token}'})
    order_creation_json = await order_creation.json
    assert order_creation.status_code == 200

    order_response = await client.get(f"/api/order/{order_creation_json.get('id')}",
                                      headers={'Authorization': f'Bearer {token}'})
    order_json = await order_response.json
    assert order_response.status_code == 200
    assert order_json['price'] == 1600

@pytest.mark.asyncio(loop_scope="session")
async def test_employee_orders(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'sales_rep', 'password': 'sales_pass'})
    token = (await login_response.json)['access_token']

    orders = await client.get("/api/employee/orders", headers={'Authorization': f'Bearer {token}'})
    orders_json = await orders.json
    assert len(orders_json.get("orders")) == 2

    order = await client.get("/api/employee/order/1", headers={'Authorization': f'Bearer {token}'})
    order_json = await order.json
    assert order.status_code == 200
    assert order_json['price'] == 1000

    order = await client.get("/api/employee/order/2", headers={'Authorization': f'Bearer {token}'})
    order_json = await order.json
    assert order.status_code == 200
    assert order_json['price'] == 1600
# endregion

# region Test Drives
@pytest.mark.asyncio(loop_scope="session")
async def test_test_drive_creation(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'test_api', 'password': 'api_password'})
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

    order = await client.get("/api/employee/order/1", headers={'Authorization': f'Bearer {token}'})
    order_json = await order.json
    assert order.status_code == 200
    assert order_json['price'] == 1000

    order = await client.get("/api/employee/order/2", headers={'Authorization': f'Bearer {token}'})
    order_json = await order.json
    assert order.status_code == 200
    assert order_json['price'] == 1600
# endregion

# region Employee Statistics
@pytest.mark.asyncio(loop_scope="session")
async def test_employee_order_statistics(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'sales_rep', 'password': 'sales_pass'})
    token = (await login_response.json)['access_token']

    order_statistics = await client.get("/api/me/order_statistics", headers={'Authorization': f'Bearer {token}'})
    order_statistics_json = await order_statistics.json

    assert order_statistics.status_code == 200
    assert order_statistics_json[0]['label'] == 'Ordered'
    assert order_statistics_json[0]['value'] == 2

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
    assert order_statistics_json['data'][0]['Ordered'] == 2
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
    assert order_statistics_json[0]['Ordered'] == 2

@pytest.mark.asyncio(loop_scope="session")
async def test_manager_monthly_test_drive_statistics(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'manager', 'password': 'manager_pass'})
    token = (await login_response.json)['access_token']

    test_drive_statistics = await client.get("/api/monthly_test_drive_statistics", headers={'Authorization': f'Bearer {token}'})
    test_drive_statistics_json = await test_drive_statistics.json

    assert test_drive_statistics.status_code == 200
    assert test_drive_statistics_json[0]['Requested'] == 1
# endregion

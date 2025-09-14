import pytest
from tests.init_app import app, client
from tests.init_db import tortoise_db


@pytest.mark.asyncio(loop_scope="session")
async def test_order_creation(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'user', 'password': 'user_pass'})
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
    assert order_creation.status_code == 200

@pytest.mark.asyncio(loop_scope="session")
async def test_order_creation_extras(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'user', 'password': 'user_pass'})
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
    assert order_creation.status_code == 200

@pytest.mark.asyncio(loop_scope="session")
async def test_employee_orders(app, client, tortoise_db):
    login_response = await client.post("/api/login", json={'username': 'sales_rep', 'password': 'sales_pass'})
    token = (await login_response.json)['access_token']

    orders = await client.get("/api/employee/orders", headers={'Authorization': f'Bearer {token}'})
    orders_json = await orders.json
    assert len(orders_json.get("orders")) == 3

    order = await client.get("/api/employee/order/2", headers={'Authorization': f'Bearer {token}'})
    order_json = await order.json
    assert order.status_code == 200
    assert order_json['price'] == 1000

    order = await client.get("/api/employee/order/3", headers={'Authorization': f'Bearer {token}'})
    order_json = await order.json
    assert order.status_code == 200
    assert order_json['price'] == 1600

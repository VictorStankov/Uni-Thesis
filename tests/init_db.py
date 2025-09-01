from tortoise import Tortoise
from application.config_helper import ConfigHelper
import pytest_asyncio

from init_app import client
from database import (OrderStatus, TestDriveStatus, Car, CarType, CarColour, Colour, CarInterior,
                      Interior, User, Employee, EmployeePosition, Position)


@pytest_asyncio.fixture(scope="module", autouse=True)
async def tortoise_db(client):
    config = ConfigHelper()

    db_url = 'mysql://{}:{}@{}:{}/{}'.format(
            config.get_config_value('database_username'),
            config.get_config_value('database_password'),
            config.get_config_value('database_url'),
            config.get_config_value('database_port'),
            'test_project'
    )

    # Set up the database connection
    await Tortoise.init(
        db_url=db_url,
        modules={"models": ["database.models"]},
        _create_db=True
    )

    await Tortoise.generate_schemas()  # Create schemas
    await OrderStatus.create_order_statuses()
    await TestDriveStatus.create_test_drive_statuses()
    await EmployeePosition.create_employee_positions()

    await insert_cars()
    await insert_employees(client)
    await insert_users(client)
    await insert_data(client)

    yield

    await Tortoise._drop_databases()
    await Tortoise.close_connections()  # Close connection after tests

async def insert_cars():
    car = await Car.create(name='TestCar', type=CarType.SUV, base_price=1000, base_image_path='')
    await CarColour.create(car=car, colour=Colour.Red, is_base=True, price_increase=0)
    await CarColour.create(car=car, colour=Colour.Blue, is_base=False, price_increase=100)
    await CarInterior.create(car=car, interior_type=Interior.Standard, is_base=True, price_increase=0)
    await CarInterior.create(car=car, interior_type=Interior.Deluxe, is_base=False, price_increase=500)

async def insert_employees(client):
    manager_data = {
        'username': 'manager',
        'password': 'manager_pass',
        'email': 'manager@test.com',
        'first_name': 'Manager',
        'last_name': 'Test'
    }

    employee_data = {
        'username': 'sales_rep',
        'password': 'sales_pass',
        'email': 'salesrep@test.com',
        'first_name': 'Sales',
        'last_name': 'Rep'
    }

    await client.post("/api/register", json=manager_data)
    await client.post("/api/register", json=employee_data)

    manager_user = await User.filter(username="manager").first()
    manager_position = await EmployeePosition.filter(type=Position.Manager).first()
    await Employee.create(user=manager_user, position=manager_position)
    manager_employee = await Employee.filter(user=manager_user).first()

    sales_rep_user = await User.filter(username="sales_rep").first()
    sales_rep_position = await EmployeePosition.filter(type=Position.SalesRepresentative).first()
    await Employee.create(user=sales_rep_user, position=sales_rep_position, manager=manager_employee)

async def insert_users(client):
    user_data = {
        'username': 'user',
        'password': 'user_pass',
        'email': 'user@test.com',
        'first_name': 'User',
        'last_name': 'Test'
    }

    await client.post("/api/register", json=user_data)

async def insert_data(client):
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

    await client.post("/api/orders", json=data, headers={'Authorization': f'Bearer {token}'})

    car_config = await client.get("/api/cars/configs/TestCar")
    car_json = await car_config.json


    data = {
        'car_id': car_json.get('car').get('id')
    }

    await client.post("/api/test_drives", json=data, headers={'Authorization': f'Bearer {token}'})

from tortoise.contrib.quart import register_tortoise

from application import config_helper
from application import app
from .models import *
from .user_api import UserAPI
from .car_api import CarAPI
from .order_api import OrderAPI
from .employee_api import EmployeeAPI
from .test_drive_api import TestDriveAPI

register_tortoise(
    app=app,
    db_url='mysql://{}:{}@{}:{}/{}'.format(
        config_helper.get_config_value('database_username'),
        config_helper.get_config_value('database_password'),
        config_helper.get_config_value('database_url'),
        config_helper.get_config_value('database_port'),
        config_helper.get_config_value('database_schema'),
    ),
    modules={'models': ['database.models']},
    generate_schemas=True
)

@app.before_serving
async def startup():
    await OrderStatus.create_order_statuses()
    await TestDriveStatus.create_test_drive_statuses()
    await EmployeePosition.create_employee_positions()

from tortoise.contrib.quart import register_tortoise

from application import config_helper
from application.app_generator import app
from .models import *
from .user_api import UserAPI

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
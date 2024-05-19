from tortoise import Tortoise
from application import config_helper


async def init():
    await Tortoise.init(
        db_url='mysql://{}:{}@{}:{}/{}'.format(
            config_helper.get_config_value('database_username'),
            config_helper.get_config_value('database_password'),
            config_helper.get_config_value('database_url'),
            config_helper.get_config_value('database_port'),
            config_helper.get_config_value('database_schema'),
        ),
        modules={'models': ['database.models']}
    )

    await Tortoise.generate_schemas(safe=True)

from peewee import MySQLDatabase
from application import config_helper


db = MySQLDatabase(
    config_helper.get_config_value('database_schema'),
    host=config_helper.get_config_value('database_url'),
    port=config_helper.get_config_value('database_port'),
    user=config_helper.get_config_value('database_username'),
    password=config_helper.get_config_value('database_password')
)
db.connect()

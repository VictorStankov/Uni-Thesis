from quart import Blueprint

from application import config_helper

test = Blueprint('test', __name__)


@test.route('/')
def hello_world():  # put application's code here
    return config_helper.get_config_value('database_username')
    return 'Hello World!'

from quart import Quart
from application import config_helper


app = Quart(__name__)
app.config['DEBUG'] = int(config_helper.get_config_value('debug'))

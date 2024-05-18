from quart import Quart
from application import config_helper


app = Quart(__name__)
app.config['DEBUG'] = config_helper.get_config_value('debug')

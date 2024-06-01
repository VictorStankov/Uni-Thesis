from .config_helper import ConfigHelper
from .app_generator import create_app

config_helper = ConfigHelper()
app = create_app(config_helper.get_config_value('debug'))

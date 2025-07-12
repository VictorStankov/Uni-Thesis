from .config_helper import config
from .app_generator import create_app
from .assistant import *

app = create_app(config.get_config_value('debug'))

from .config_helper import config
from .app_generator import create_app

app = create_app(config.get_config_value('debug'))
frontend_url = config.get_config_value('frontend_url')

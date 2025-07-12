import configparser as cfg
import logging as log
import os
import urllib.parse
from typing import Union

class ConfigHelper:
    def __init__(self):
        self._parse_config()

    @staticmethod
    def _load_config():
        if not os.path.exists(os.getcwd() + '/config.cfg'):
            log.error('config.cfg not found')
            raise FileNotFoundError('config.cfg not found')

        parser = cfg.ConfigParser()
        parser.read(os.getcwd() + '/config.cfg')
        log.info('Config Loaded...')

        return parser

    def _parse_config(self):
        config = ConfigHelper._load_config()
        self.debug = int(config['Application']['debug'])
        self.database_url = config['Database']['url']
        self.database_port = int(config['Database']['port'])
        self.database_username = config['Database']['username']
        self.database_password = urllib.parse.quote_plus(config['Database']['password'])
        self.database_schema = config['Database']['schema']

        self.assistant_url = config['Assistant']['url']
        self.assistant_port = config['Assistant']['port']
        self.assistant_model = config['Assistant']['model']

    def get_config_value(self, parameter: str) -> Union[int, str]:
        if parameter not in self.__dict__:
            log.error('Parameter not found')
            raise KeyError(parameter)

        value = self.__getattribute__(parameter)
        self.__delattr__(parameter)

        return value

config = ConfigHelper()

from typing import Dict, List, Any

import requests
import uuid

from .config_helper import config

assistant_url = config.get_config_value('assistant_url')
assistant_port = config.get_config_value('assistant_port')
assistant_model = config.get_config_value('assistant_model')

class AssistantMessages:
    messages: Dict[str, List[Dict[str, Any]]] = {}

    @classmethod
    def start_chat(cls):
        identifier = str(uuid.uuid4())

        cls.messages[identifier] = []

        response = cls.make_chat_request(identifier, "You're a helpful assistant that aids people in choosing the right car for them", role='system')
        return {'chat_id': identifier, 'response': response}

    @classmethod
    def _add_message(cls, identifier: str, message: Dict[str, str]):
        if identifier not in cls.messages.keys():
            raise Exception(f'Identifier {identifier} not found')

        cls.messages[identifier].append(message)

    @classmethod
    def _get_messages(cls, identifier: str):
        if identifier not in cls.messages.keys():
            raise Exception(f'Identifier {identifier} not found')

        return cls.messages[identifier][:10]

    @classmethod
    def make_chat_request(cls, identifier: str, message: str, role: str = 'user'):
        message_dict = {'content': message, 'role': role}
        cls._add_message(identifier, message_dict)

        response = requests.post(
            url=f'{assistant_url}:{assistant_port}/api/chat',
            json={
                'model': assistant_model,
                'messages': cls._get_messages(identifier),
                'stream': False,
                'think': True
            },
        )

        response_message = response.json().get('message')

        cls._add_message(identifier, response_message)

        return response_message['content']

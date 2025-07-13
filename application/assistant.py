import json
from typing import Dict, List, Any

import requests

from .config_helper import config

assistant_url = config.get_config_value('assistant_url')
assistant_port = config.get_config_value('assistant_port')
assistant_model = config.get_config_value('assistant_model')

class AssistantMessages:
    messages: Dict[str, List[Dict[str, Any]]] = {}

    @classmethod
    def start_chat(cls, identifier: str):
        cls.messages[identifier] = []

        response = cls.make_chat_request(identifier, "You're a helpful assistant that aids people in choosing the right car for them", role='system')
        return response

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

        def stream_ollama():
            accumulated_response = ""
            resp = requests.post(
                f'{assistant_url}:{assistant_port}/api/chat',
                json={
                    "model": assistant_model,
                    "messages": cls._get_messages(identifier),
                    "stream": True
                },
                stream=True
            )
            for line in resp.iter_lines():
                if line:
                    try:
                        data = json.loads(line.decode("utf-8"))
                        token = data.get("message", {}).get("content", '')
                        accumulated_response += token
                        yield token
                    except Exception:
                        continue

            # Save assistant response to session memory
            cls._add_message(identifier, {
                "role": "assistant",
                "content": accumulated_response.strip()
            })

        return stream_ollama()

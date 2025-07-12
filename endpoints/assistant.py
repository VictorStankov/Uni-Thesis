from marshmallow import ValidationError
from quart import Blueprint, request

from .models import AssistantAddMessageSchema
from application.assistant import AssistantMessages

assistant_blueprint = Blueprint('assistant', __name__)


@assistant_blueprint.route('/assistant/start_chat', methods=['POST'])
async def start_chat():
    return AssistantMessages.start_chat()


@assistant_blueprint.route('/assistant/add_message', methods=['POST'])
async def add_message():
    body = await request.json

    try:
        result = AssistantAddMessageSchema().load(body)
    except ValidationError as e:
        return e.messages, 400

    return {'response': AssistantMessages.make_chat_request(identifier=result['chat_id'], message=result['message'])}

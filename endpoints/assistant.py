import uuid

from marshmallow import ValidationError
from quart import Blueprint, request, Response

from application.assistant import AssistantMessages
from .models import AssistantAddMessageSchema

assistant_blueprint = Blueprint('assistant', __name__)


@assistant_blueprint.route('/assistant/start_chat', methods=['POST'])
async def start_chat():
    identifier = str(uuid.uuid4())

    return AssistantMessages.start_chat(identifier), 200, {'chatId': identifier, 'Content-Type': 'text/plain'}


@assistant_blueprint.route('/assistant/add_message', methods=['POST'])
async def add_message():
    body = await request.json

    try:
        result = AssistantAddMessageSchema().load(body)
    except ValidationError as e:
        return e.messages, 400

    return Response(AssistantMessages.make_chat_request(identifier=result['chat_id'], message=result['message']),
                    content_type='text/plain')

from quart import Blueprint, request

from application.assistant import AssistantMessages

assistant_blueprint = Blueprint('assistant', __name__)


@assistant_blueprint.route('/assistant/start_chat', methods=['POST'])
async def start_chat():
    return AssistantMessages.start_chat()

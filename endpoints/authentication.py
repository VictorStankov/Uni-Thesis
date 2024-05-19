from marshmallow.exceptions import ValidationError
from quart import Blueprint, request

from database.UserAPI import UserAPI
from database.models import User
from endpoints.helpers import generate_token, login_required
from endpoints.models import UserLoginSchema, UserRegistrationSchema

authentication = Blueprint('test', __name__)


@authentication.route('/register', methods=['POST'])
async def register():
    json = await request.json

    try:
        result = UserRegistrationSchema().load(json)
    except ValidationError as e:
        return e.messages, 400

    await UserAPI.create_user(
        username=result.get('username'),
        password=result.get('password'),
        email=result.get('email'),
        first_name=result.get('first_name'),
        last_name=result.get('last_name'),
        phone=result.get('phone')
    )
    return {'message': 'User created successfully'}, 200


@authentication.route('/login', methods=['GET'])
async def login():
    args = {
        'username': request.args.get('username'),
        'password': request.args.get('password')
    }

    try:
        result = UserLoginSchema().load(args)
    except ValidationError as e:
        return e.messages, 400

    if (not await UserAPI.user_exists(username=result['username']) or
            not await UserAPI.verify_credentials(result['username'], result['password'])):
        return {'message': 'Invalid user and password combination'}, 400

    return {
        'token_type': 'Bearer',
        'expires_in': 14400,
        'access_token': await generate_token(result['username'])
    }, 200


@authentication.route('/test', methods=['GET'])
@login_required
async def test(user: User):
    return user.username

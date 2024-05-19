import datetime
import logging as log
from functools import wraps
from typing import Callable

import jwt
from jwt import encode
from quart import Blueprint, request

from endpoints.models import UserSchema
from marshmallow.exceptions import ValidationError
from database.UserAPI import UserAPI
from database.models import User
from application.app_generator import app

authentication = Blueprint('test', __name__)


async def generate_token(username: str) -> str:
    utc_now = datetime.datetime.now(tz=datetime.UTC)

    payload = {
        'iat': utc_now,
        'exp': utc_now + datetime.timedelta(hours=4),
        'sub': username
    }

    return encode(
        payload,
        str(app.secret_key),
        algorithm='HS512'
    )


async def verify_user() -> User:
    authorization_header = request.headers.get('Authorization').replace('Bearer ', '')
    try:
        decoded_token = jwt.decode(authorization_header, str(app.secret_key), algorithms='HS512')

        return await UserAPI.get_user_by_username(decoded_token['sub'])
    except Exception as e:
        log.error(f'User Token verification failed: {e}')


def login_required(f: Callable) -> Callable:
    @wraps(f)
    async def decorated_function(*args, **kwargs):
        user = await verify_user()

        if not user:
            return {'message': 'Unauthorized'}, 401

        return await f(*args, user, **kwargs)

    return decorated_function


@authentication.route('/login', methods=['GET'])
async def login():
    args = {
        'username': request.args.get('username'),
        'password': request.args.get('password')
    }

    try:
        result = UserSchema().load(args)
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

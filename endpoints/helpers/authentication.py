import datetime
import logging as log
from functools import wraps
from typing import Callable

import jwt
from quart import request

from application.app_generator import app
from database import UserAPI
from database.models import User


async def generate_token(username: str) -> str:
    utc_now = datetime.datetime.now(tz=datetime.UTC)

    payload = {
        'iat': utc_now,
        'exp': utc_now + datetime.timedelta(hours=4),
        'sub': username
    }

    return jwt.encode(
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

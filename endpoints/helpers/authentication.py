import datetime
import logging as log
from functools import wraps
from typing import Callable, Union

import jwt
from quart import request

from application import app
from database import UserAPI, Employee
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


async def verify_user() -> Union[User, None]:
    authorization_header = request.headers.get('Authorization')

    if not authorization_header:
        log.debug(f'Authorization header is missing')
        return None

    try:
        decoded_token = jwt.decode(authorization_header.replace('Bearer ', ''), str(app.secret_key), algorithms='HS512')

        return await UserAPI.get_user_by_username(decoded_token['sub'])
    except Exception as e:
        log.debug(f'User Token verification failed: {e}')


def login_required(f: Callable) -> Callable:
    @wraps(f)
    async def decorated_function(*args, **kwargs):
        user = await verify_user()

        if not user:
            return {'message': 'Unauthorized'}, 401

        return await f(*args, user, **kwargs)

    return decorated_function


async def verify_employee() -> Union[Employee, None]:
    user = await verify_user()

    try:
        return await UserAPI.get_employee_by_username(user.username)
    except Exception as e:
        print(e)
        log.debug(f'Employee Token verification failed: {e}')


def employee_login_required(f: Callable) -> Callable:
    @wraps(f)
    async def decorated_function(*args, **kwargs):
        employee = await verify_employee()

        if not employee:
            return {'message': 'Unauthorized'}, 401

        return await f(*args, employee, **kwargs)

    return decorated_function

def manager_login_required(f: Callable) -> Callable:
    @wraps(f)
    async def decorated_function(*args, **kwargs):
        employee = await verify_employee()

        if not employee or not await UserAPI.is_user_manager((await employee.user).username):
            return {'message': 'Unauthorized'}, 401

        return await f(*args, employee, **kwargs)

    return decorated_function

from typing import List

import bcrypt

from application.exceptions import UserNotFoundException, UserAlreadyExistsException
from database.models import User, UserBasicInfo


class UserAPI:
    @staticmethod
    async def user_exists(username: str) -> bool:
        return await User.exists(username=username)

    @staticmethod
    async def get_user_by_id(user_id: int) -> User:
        return await User.filter(id=user_id).only('id', 'username').first()

    @staticmethod
    async def get_user_by_username(username: str) -> User:
        return await User.filter(username=username).only('id', 'username').first()

    @staticmethod
    async def get_user_info(user: User) -> UserBasicInfo:
        return await UserBasicInfo.filter(user=user).first()

    @staticmethod
    async def list_users() -> List[User]:
        return await User.all().only("id", "username")

    @staticmethod
    async def create_user(
            username: str,
            password: str,
            email: str,
            first_name: str,
            last_name: str,
            phone: str) -> None:
        if await UserAPI.user_exists(username=username):
            raise UserAlreadyExistsException(username=username)

        hash_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user = await User.create(
            username=username,
            password=hash_password
        )

        await UserBasicInfo.create(email=email, first_name=first_name, last_name=last_name, phone=phone, user=user)

    @staticmethod
    async def set_password(username: str, password: str) -> None:
        user = await User.filter(username=username).first()
        if user is None:
            raise UserNotFoundException(username=username)

        user.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    @staticmethod
    async def delete_user(username: str) -> None:
        user = await User.filter(username=username).first()
        if user is None:
            raise UserNotFoundException(username=username)

        await user.delete()

    @staticmethod
    async def verify_credentials(username: str, password: str) -> bool:
        user = await User.filter(username=username).first()
        if user is None:
            raise UserNotFoundException(username=username)

        return bcrypt.checkpw(password.encode('utf-8'), user.password)

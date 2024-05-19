from database.models import User
import bcrypt
from typing import List


class UserAPI:
    @staticmethod
    async def user_exists(username: str) -> bool:
        return await User.exists(username=username)

    @staticmethod
    async def get_user_by_id(user_id: int) -> User:
        return await User.filter(id=user_id).first()

    @staticmethod
    async def get_user_by_username(username: str) -> User:
        return await User.filter(username=username).first()

    @staticmethod
    async def list_users() -> List[User]:
        return await User.all().only("id", "username")

    @staticmethod
    async def create_user(username: str, password: str) -> None:
        if UserAPI.user_exists(username=username):
            raise Exception('User already exists')

        hash_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        await User.create(username=username, password=hash_password)

    @staticmethod
    async def set_password(username: str, password: str) -> None:
        user = await UserAPI.get_user_by_username(username)
        if user is None:
            raise Exception('User not found')

        user.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    @staticmethod
    async def delete_user(username: str) -> None:
        user = await UserAPI.get_user_by_username(username)
        if user is None:
            raise Exception('User not found')

        await user.delete()

    @staticmethod
    async def verify_credentials(username: str, password: str) -> bool:
        user = await UserAPI.get_user_by_username(username)
        if user is None:
            raise Exception('User not found')

        return bcrypt.checkpw(password.encode('utf-8'), user.password)

from tortoise import fields
from tortoise.models import Model

from database.models import UserBasicInfo


class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=255, unique=True, null=False)
    password = fields.BinaryField(null=False)
    basic_info: fields.ReverseRelation['UserBasicInfo']

    def __str__(self):
        return f'<User: {self.username}>'

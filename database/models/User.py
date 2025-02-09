from tortoise import fields
from tortoise.models import Model


class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=255, unique=True, null=False)
    password = fields.BinaryField(null=False)

    def __str__(self):
        return f'<User: {self.username}>'

    class Meta:
        table = 'user'

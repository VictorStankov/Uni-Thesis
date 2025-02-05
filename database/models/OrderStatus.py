from tortoise import fields
from tortoise.models import Model


class OrderStatus(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(unique=True, max_length=20)

    def __str__(self):
        return f"{self.id} - {self.name}"

    async def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }

    class Meta:
        table = 'order_status'

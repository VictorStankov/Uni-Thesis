from tortoise import fields
from tortoise.models import Model
from tortoise.transactions import in_transaction


class OrderStatus(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(unique=True, max_length=20)

    def __str__(self):
        return f"{self.id} - {self.name}"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }

    @staticmethod
    async def create_order_statuses():
        async with in_transaction():
            statuses = ['Ordered', 'Paid', 'Manufactured', 'Shipped', 'Completed']

            for i, status in enumerate(statuses):
                if not await OrderStatus.exists(name=status):
                    await OrderStatus.create(id=i + 1, name=status)

    class Meta:
        table = 'order_status'

from enum import Enum

from tortoise import fields
from tortoise.models import Model

class Status(Enum):
    Ordered = 'Ordered'
    Paid = 'Paid'
    Manufactured = 'Manufactured'
    Shipped = 'Shipped'
    Completed = 'Completed'

class Order(Model):
    id = fields.IntField(pk=True)
    car = fields.ForeignKeyField('models.Car', related_name='order', related_query_name='order')
    interior = fields.ForeignKeyField('models.CarInterior', related_name='order', related_query_name='order')
    colour = fields.ForeignKeyField('models.CarColour', related_name='order', related_query_name='order')
    price = fields.FloatField(null=False)
    order_placer = fields.ForeignKeyField('models.User', related_name='order', related_query_name='order')
    created_at = fields.DatetimeField(null=False, auto_now_add=True)
    updated_at = fields.DatetimeField(null=False, auto_now=True)
    status = fields.ForeignKeyField('models.OrderStatus', related_name='status', related_query_name='status')
    employee = fields.ForeignKeyField('models.Employee', related_name='orders', related_query_name='orders', null=True) # FIXME

    def __str__(self):
        return (f"{self.id} - {self.car} - {self.interior} - {self.colour} - {self.price} - {self.order_placer} - "
                f"{self.created_at} - {self.updated_at} - {self.status} - {self.employee}")

    async def to_dict(self):
        return {
            'id': self.id,
            'car': (await self.car).to_dict(),
            'interior': (await self.interior).to_dict(),
            'colour': (await self.colour).to_dict(),
            'price': self.price,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'status': (await self.status).to_dict(),
            'employee': await (await self.employee).to_dict() if self.employee else {},  # FIXME
        }

    class Meta:
        table = 'order'

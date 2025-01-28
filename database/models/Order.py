from tortoise import fields
from tortoise.models import Model


class Order(Model):
    id = fields.IntField(pk=True)
    car = fields.ForeignKeyField('models.Car', related_name='order', related_query_name='order')
    interior = fields.ForeignKeyField('models.CarInterior', related_name='order', related_query_name='order')
    colour = fields.ForeignKeyField('models.CarColour', related_name='order', related_query_name='order')
    price = fields.FloatField(null=False)
    order_placer = fields.ForeignKeyField('models.User', related_name='order', related_query_name='order')

    def __str__(self):
        return f"{self.car} - {self.car} - {self.interior} - {self.colour} - {self.price} - {self.order_placer}"

    async def to_dict(self):
        return {
            'id': self.id,
            'car': (await self.car).to_dict(),
            'interior': (await self.interior).to_dict(),
            'colour': (await self.colour).to_dict(),
            'price': self.price
        }

    class Meta:
        table = 'order'

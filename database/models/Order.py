from tortoise import fields
from tortoise.models import Model


class Order(Model):
    id = fields.IntField(pk=True)
    car = fields.ForeignKeyField('models.Car', related_name='orders', related_query_name='order')
    interior_type = fields.ForeignKeyField('models.CarInterior', related_name='orders', related_query_name='order')
    colour = fields.ForeignKeyField('models.CarColour', related_name='orders', related_query_name='order')
    price = fields.FloatField(null=False)
    order_placer = fields.ForeignKeyField('models.User', related_name='orders', related_query_name='order')

    def __str__(self):
        return f"{self.car} - {self.car} - {self.interior_type} - {self.colour} - {self.price} - {self.order_placer}"

    def to_dict(self):
        return {
            'id': self.id,
            'car': self.car,
            'interior_type': self.interior_type,
            'colour': self.colour,
            'price': self.price,
            'order_placer': self.order_placer,
        }

    class Meta:
        table = 'order'

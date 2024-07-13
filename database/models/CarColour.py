from enum import Enum

from tortoise import fields
from tortoise.models import Model


class Colour(Enum):
    Red = 'Red'
    Green = 'Green'
    Blue = 'Blue'
    Gray = 'Gray'
    Yellow = 'Yellow'


class CarColour(Model):
    id = fields.IntField(pk=True)
    car_id = fields.ForeignKeyField('models.Car', related_name='colours', related_query_name='colour')
    colour = fields.data.CharEnumField(Colour)
    price_increase = fields.FloatField(null=False)

    def __str__(self):
        return f"{self.car_id} - {self.colour.value} - {self.price_increase}"

    def to_dict(self):
        return {
            'id': self.id,
            'colour': self.colour.value,
            'price_increase': self.price_increase
        }

    class Meta:
        table = 'car_colour'

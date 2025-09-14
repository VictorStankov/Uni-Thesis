from enum import Enum

from tortoise import fields
from tortoise.models import Model


class Interior(Enum):
    Standard = 'Standard'
    Premium = 'Premium'
    Deluxe = 'Deluxe'


class CarInterior(Model):
    id = fields.IntField(pk=True)
    car = fields.ForeignKeyField('models.Car', related_name='interior')
    interior_type = fields.data.CharEnumField(Interior)
    is_base = fields.data.BooleanField(null=False)
    price_increase = fields.FloatField(null=False)

    def __str__(self):
        return f"{self.car} - {self.interior_type.value} - {self.price_increase}"

    def to_dict(self):
        return {
            'id': self.id,
            'interior': self.interior_type.value,
            'is_base': self.is_base,
            'price_increase': self.price_increase
        }

    class Meta:
        table = 'car_interior'

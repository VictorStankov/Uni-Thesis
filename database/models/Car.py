from enum import Enum

from tortoise import fields
from tortoise.models import Model


class CarType(Enum):
    SUV = 'SUV'
    Sedan = 'Sedan'
    Hatchback = 'Hatchback'
    Minivan = 'Minivan'


class Car(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100, null=False)
    type = fields.data.CharEnumField(CarType)
    base_price = fields.FloatField(null=False)
    base_image_path = fields.CharField(max_length=255, null=False)

    def __str__(self):
        return f"{self.name} - {self.type}"

    class Meta:
        table = 'car'

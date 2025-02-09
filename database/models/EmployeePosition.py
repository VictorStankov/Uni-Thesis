from enum import Enum

from tortoise import fields
from tortoise.models import Model
from tortoise.transactions import in_transaction


class Position(Enum):
    Manager = 'Manager'
    SalesRepresentative = 'Sales Representative'


class EmployeePosition(Model):
    id = fields.IntField(pk=True)
    type = fields.data.CharEnumField(Position)

    def __str__(self):
        return f'{self.id} - {self.type.value}'

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type.value,
        }

    @staticmethod
    async def create_employee_positions():
        async with in_transaction():
            positions = [x.value for x in Position]

            for i, position in enumerate(positions):
                if not await EmployeePosition.exists(type=position):
                    await EmployeePosition.create(id=i + 1, type=position)

    class Meta:
        table = 'employee_position'

from enum import Enum

from tortoise import fields
from tortoise.models import Model

class Status(Enum):
    Requested = 'Requested'
    Scheduled = 'Scheduled'
    Completed = 'Completed'

class TestDrive(Model):
    id = fields.IntField(pk=True)
    car = fields.ForeignKeyField('models.Car', related_name='test_drives')
    requestor = fields.ForeignKeyField('models.User', related_name='test_drives')
    created_at = fields.DatetimeField(null=False, auto_now_add=True)
    updated_at = fields.DatetimeField(null=False, auto_now=True)
    status = fields.ForeignKeyField('models.TestDriveStatus', related_name='status')
    employee = fields.ForeignKeyField('models.Employee', related_name='test_drives')

    def __str__(self):
        return f"{self.id} - {self.car} - {self.requestor} - {self.created_at} - {self.status} - {self.employee}"

    async def to_dict(self):
        return {
            'id': self.id,
            'car': (await self.car).to_dict(),
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'status': (await self.status).to_dict(),
            'requestor': (await self.requestor).id,
            'employee': await (await self.employee).to_dict() if self.employee else {},
        }

    class Meta:
        table = 'test_drive'

from tortoise import fields
from tortoise.models import Model
from tortoise.transactions import in_transaction


class TestDriveStatus(Model):
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
    async def create_test_drive_statuses():
        async with in_transaction():
            statuses = ['Requested', 'Scheduled', 'Completed']

            for i, status in enumerate(statuses):
                if not await TestDriveStatus.exists(name=status):
                    await TestDriveStatus.create(id=i + 1, name=status)

    class Meta:
        table = 'test_drive_status'

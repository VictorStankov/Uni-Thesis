from tortoise import fields
from tortoise.models import Model


class Employee(Model):
    id = fields.IntField(pk=True)
    user = fields.OneToOneField('models.User')
    position = fields.ForeignKeyField('models.EmployeePosition')
    manager = fields.ForeignKeyField('models.Employee', related_name='employees', related_query_name='employees', null=True)

    def __str__(self):
        return f'{self.id} - {self.user} - {self.position} - {self.position}'

    async def to_dict(self):
        return {
            'id': self.id,
            'user': (await self.user).username,
            'position': (await self.position).to_dict(),
        }


    class Meta:
        table = 'employee'

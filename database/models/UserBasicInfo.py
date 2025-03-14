from tortoise import fields
from tortoise.models import Model


class UserBasicInfo(Model):
    user = fields.OneToOneField('models.User', related_name='basic_info')
    email = fields.CharField(max_length=255, null=False)
    first_name = fields.CharField(max_length=50, null=False)
    last_name = fields.CharField(max_length=50, null=False)
    phone = fields.CharField(max_length=20, null=True)

    def __str__(self):
        return f"email: {self.email}, first_name: {self.first_name}, last_name: {self.last_name}, phone: {self.phone}"

    def to_dict(self):
        return {
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "phone": self.phone,
        }

    class Meta:
        table = 'user_basic_info'

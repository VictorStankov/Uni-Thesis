from database.models import BaseModel
from peewee import AutoField, CharField


class User(BaseModel):
    id = AutoField()
    username = CharField(100)
    password = CharField(50)

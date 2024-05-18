from database.connection_builder import db
from database.models import User

db.create_tables([User])

from application.app_generator import app
from .UserAPI import UserAPI
from .connection_builder import init
from .models import *


@app.before_serving
async def before_serving():
    await init()

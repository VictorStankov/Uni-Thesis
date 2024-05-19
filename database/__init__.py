from database.connection_builder import init
import database.models
from application.app_generator import app


@app.before_serving
async def before_serving():
    await init()

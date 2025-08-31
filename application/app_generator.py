from quart import Quart
from quart_cors import cors


def create_app(debug: int, frontend_url: str) -> Quart:
    app = Quart(__name__)
    app.config['DEBUG'] = debug

    app = cors(app, allow_origin=frontend_url.strip('/'))
    return app

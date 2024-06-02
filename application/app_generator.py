from quart import Quart
# from quart_cors import cors


def create_app(debug: int) -> Quart:
    app = Quart(__name__)
    app.config['DEBUG'] = debug

    # app = cors(app, allow_origin='http://localhost:5173')
    return app

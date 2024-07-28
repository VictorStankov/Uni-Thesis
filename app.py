import os

import endpoints
from application import app
from quart import send_from_directory

app.register_blueprint(endpoints.authentication, url_prefix='/api')
app.register_blueprint(endpoints.car_blueprint, url_prefix='/api')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
async def serve(path: str):
    if path != "":
        if os.path.exists('./frontend/dist' + '/' + path):
            return await send_from_directory('./frontend/dist', path)
        if path.split('/')[0] == 'img' and os.path.exists('./' + path):
            return await send_from_directory('./', path, mimetype='image/png')
    return await send_from_directory('./frontend/dist', 'index.html')


if __name__ == '__main__':
    app.run()

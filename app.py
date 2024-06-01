import endpoints.authentication
from application import app
from quart import send_from_directory

app.register_blueprint(endpoints.authentication, url_prefix='/api')


@app.route('/')
@app.route('/login')
@app.route('/register')
async def root():
    return await send_from_directory('./frontend/dist', 'index.html')


@app.route('/<path:path>')
async def assets(path):
    return await send_from_directory('./frontend/dist', path)


if __name__ == '__main__':
    app.run()

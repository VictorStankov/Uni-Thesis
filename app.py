import endpoints.authentication
from application.app_generator import app

app.register_blueprint(endpoints.authentication)

if __name__ == '__main__':
    app.run()

import endpoints.test
from application.app_generator import app

app.register_blueprint(endpoints.test.test)

if __name__ == '__main__':
    app.run()

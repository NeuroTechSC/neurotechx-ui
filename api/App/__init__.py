from flask import Flask

from App.ext import init_ext

from App.settings import envs
from App.views import init_blueprint


def create_app():
    app = Flask(__name__)

    # load in config object
    app.config.from_object(envs.get('develop'))
    # init extensions
    init_ext(app=app)
    # init blueprint
    init_blueprint(app=app)

    return app

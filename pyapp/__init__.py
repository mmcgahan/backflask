from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager

""" Backflask application """

# Set up app and db
app = Flask(__name__, static_folder="../assets", instance_relative_config=True)
app.config.from_pyfile('config.py')
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.setup_app(app)

# import models and views - must wait until after app and db instantiated
import models
import views

@login_manager.user_loader
def load_user(userid):
    return models.User.query.get(userid)

# import and register api blueprint
from .api import api_blueprint
app.register_blueprint(api_blueprint, url_prefix="/api")
import xmlrpc

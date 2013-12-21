from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

""" Backflask application """

# Set up app and db
app = Flask(__name__, static_folder="../assets", instance_relative_config=True)
app.config.from_pyfile('config.py')
db = SQLAlchemy(app)

# import models and views - must wait until after app and db instantiated
import models
import views

# import api blueprint
from .api import api_blueprint
app.register_blueprint(api_blueprint, url_prefix="/api")

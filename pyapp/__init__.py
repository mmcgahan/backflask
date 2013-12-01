from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

""" Backflask application """

# Set up app and db
app = Flask(__name__, static_folder="../assets")
app.config.from_object('pyapp.config.Config')
db = SQLAlchemy(app)

# import models and views - must wait until after app and db instantiated
import models
import views

# import api blueprint
from pyapp.api import api
app.register_blueprint(api, url_prefix="/api")

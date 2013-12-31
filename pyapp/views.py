from flask import render_template
from . import app


"""Server-populated views

Currently this is set up to always render the base template. The front end
application will take it from there and interact with the REST API
"""

@app.route('/', defaults={'path': ''}, methods=['GET'])
@app.route('/<path:path>')
def home(path):
    return render_template('base.html')

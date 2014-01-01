from flask import render_template
from . import app


"""Server-populated views

Currently this is set up to always render the base template. The front end
application will take it from there and interact with the REST API
"""

@app.route('/', methods=['GET'])
@app.route('/<path:path>')
def home(path=''):
    return render_template('base.html')

@app.route('/posts/<post_slug>')
def post(post_slug):
    # used to get url for a post, unfortunately replicated in backbone router
    return home()

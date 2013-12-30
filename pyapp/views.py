from flask import render_template, request
from . import app


"""Server-populated views

Ideally there would be one catch-all view that would then pull in data from API
view functions, without duplicating the API view function names

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return 'You want path: %s' % path
"""

@app.route('/', methods=['GET'])
def home():
    """ the homepage is get-only, and sets up the base UI """
    data = { "location": "homepage" }
    return render_template('base.html', **data)  # **data sets keys as kwargs

@app.route('/posts/', methods=['GET'])
def posts():
    data = { "foo": "all posts" }
    return render_template('base.html', **data)

@app.route('/posts/<post_slug>', methods=['GET'])
def post(post_slug):
    # replace this with a generic catchall view
    data = { "foo": "single post" }
    return render_template('base.html', **data)

# tags - use url converter for list of tags in url, e.g. /tags/foo+bar

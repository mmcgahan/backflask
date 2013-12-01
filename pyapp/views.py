from flask import render_template, request
from pyapp import app


@app.route('/', methods=['GET'])
def home():
    """ the homepage is get-only, and sets up the base UI """
    data = { "foo": "bar" }
    return render_template('base.html', **data)  # **data sets keys as kwargs

@app.route('/posts/', methods=['POST', 'GET'])
def posts():
    if request.method == 'POST':
        # save stuff
        pass
    data = { "foo": "all posts" }
    return render_template('base.html', **data)

@app.route('/posts/<post_slug>', methods=['POST', 'GET'])
def post(post_slug):
    if request.method == 'POST':
        # save stuff
        pass
    data = { "foo": "single-post" }
    return render_template('base.html', **data)

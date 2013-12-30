from flask import Blueprint, jsonify
from .models import Post

""" Backflask JSON API module/blueprint

The API is its own module, independent of the UI-generating app code, so
it is developed using [Flask Blueprints](http://flask.pocoo.org/docs/blueprints/).

Using the blueprint pattern allows the API to be 'placed' wherever the main app
wants it without having to re-write all the API routes.
"""

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/posts', methods=['GET'])
def posts():
    posts = Post.get_recent(num_posts=4)
    return jsonify({ "posts": [post.serialized for post in posts] })

@api_blueprint.route('/posts/<post_slug>', methods=['GET'])
def post(post_slug):
    post = Post.query.filter(Post.slug == post_slug).first_or_404()
    return jsonify(post.serialized)

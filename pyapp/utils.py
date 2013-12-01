import string
from functools import wraps
from flask import request, render_template
from werkzeug.contrib.cache import SimpleCache

cache = SimpleCache()

def make_slug(raw_text):
    punctuation_to_strip = string.punctuation.replace("-", "")
    return str(raw_text).translate(string.maketrans(" ", "-"), punctuation_to_strip).lower()


""" [View decorators](http://flask.pocoo.org/docs/patterns/viewdecorators/) """
def cached(timeout=5 * 60, key='view/%s'):
    # caching
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            cache_key = key % request.path
            rv = cache.get(cache_key)
            if rv is not None:
                return rv
            rv = f(*args, **kwargs)
            cache.set(cache_key, rv, timeout=timeout)
            return rv
        return decorated_function
    return decorator

def templated(template=None):
    # templating
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            template_name = template
            if template_name is None:
                template_name = request.endpoint.replace('.', '/') + '.html'
            ctx = f(*args, **kwargs)
            if ctx is None:
                ctx = {}
            elif not isinstance(ctx, dict):
                return ctx
            return render_template(template_name, **ctx)
        return decorated_function
    return decorator

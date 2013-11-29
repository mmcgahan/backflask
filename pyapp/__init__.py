import json
from flask import Flask, request, render_template

app = Flask(__name__, static_folder="../assets")
app.config.from_object('pyapp.config.Config')

@app.route('/', methods=['POST', 'GET'])
def index():
    data = {
        "foo": "bar"
    }
    return json.dumps(data) if request.is_xhr else render_template('base.html', **data)

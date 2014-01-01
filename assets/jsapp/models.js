var Backbone = require('backbone');

var API_PREFIX = '/api/';
var Models = {
    'Post': Backbone.Model.extend({
        'idAttribute': 'slug',
        'urlRoot': API_PREFIX + 'posts'
    })
};
Models.Posts = Backbone.Model.extend({
    'model': Models.Post,
    'url': API_PREFIX + 'posts'
});

module.exports = Models;

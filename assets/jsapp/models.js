var Backbone = require('backbone');

module.exports = (function(Backbone) {
    'use strict';
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

    return Models;
}(Backbone));

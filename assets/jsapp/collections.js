var Backbone = require('backbone');
var Models = require('./models');

var API_PREFIX = '/api/';

module.exports = {
    'Posts': Backbone.Collection.extend({
        'url': API_PREFIX + 'posts',
        'model': Models.Post,
        'parse': function(response) {
            'use strict';
            return response.posts;
        }
    })
};

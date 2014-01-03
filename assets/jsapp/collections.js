var Backbone = require('backbone');
var Models = require('./models');

var API_PREFIX = '/api/';

module.exports = (function(Backbone, Models) {
    'use strict';

    return {
        'Posts': Backbone.Collection.extend({
            'url': API_PREFIX + 'posts',
            'model': Models.Post,
            'parse': function(response) {
                return response.posts;
            }
        })
    };
}(Backbone, Models));

define(
    ['backbone', 'models'],
    function(Backbone, Models) {
        'use strict';
        var API_PREFIX = '/api/';
        var Collections = {
            'Posts': Backbone.Collection.extend({
                'url': API_PREFIX + 'posts',
                'model': Models.Post,
                'parse': function(response) {
                    return response.posts;
                }
            })
        };
        return Collections;
    }
);

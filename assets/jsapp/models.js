define(['backbone'],
    function(Backbone) {
        'use strict';
        var Models = {
            'Post': Backbone.Model.extend({
                'idAttribute': 'slug',
                'urlRoot': '/api/posts'
            })
        };
        return Models;
    }
);

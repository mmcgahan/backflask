var _ = require('underscore');
var Backbone = require('backbone');
var Views = require('./views');
var Models = require('./models');
var Collections = require('./collections');

function fetchRender(model, ViewClass) {
    'use strict';
    var view = new ViewClass({ 'model': model });
    model.fetch({
        'success': _.bind(view.render, view)
    });
}

module.exports = (function(Backbone, Views, Models, Collections, fetchRender) {
    'use strict';
    return Backbone.Router.extend({
        'routes':{
            // could be simplified by always grabbing collection
            'posts': 'posts',
            'posts/:post': 'post'
        },
        'posts': function() {
            // might be good to cache posts collection and only fetch if empty
            fetchRender(new Collections.Posts(), Views.PostList);
        },
        'post': function(postSlug) {
            // collection-free fetch and render
            // would be good to cache post to avoid subsequent fetch
            fetchRender(new Models.Post({ slug: postSlug }), Views.Post);
        }
    });
}(Backbone, Views, Models, Collections, fetchRender));

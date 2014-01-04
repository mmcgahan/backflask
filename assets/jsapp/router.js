var _ = require('underscore');
var Backbone = require('backbone');
var Views = require('./views');
var Models = require('./models');
var Collections = require('./collections');

module.exports = (function(Backbone, Views, Models, Collections) {
    'use strict';
    var cache = {};

    function fetchRender(ModelClass, modelParams, ViewClass, cacheKey) {
        // caching works here because we're dealing with static
        // content - we don't need to ping the API to get the
        // most up-to-date information.
        if (!cache[cacheKey]) {
            var model = new ModelClass(modelParams),
                view = new ViewClass({ 'model': model });
            model.fetch({
                'success': _.bind(view.render, view)
            });
            cache[cacheKey] = view;
        } else {
            cache[cacheKey].render();
        }
    }

    return Backbone.Router.extend({
        'routes':{
            // could be simplified by always grabbing collection
            '': 'posts',
            'posts': 'posts',
            'posts/:post': 'post'
        },
        'posts': function() {
            // might be good to cache posts collection and only fetch if empty
            fetchRender(Collections.Posts, {}, Views.PostList, 'posts');
        },
        'post': function(postSlug) {
            // collection-free fetch and render
            fetchRender(Models.Post, { slug: postSlug }, Views.Post, postSlug);
        }
    });
}(Backbone, Views, Models, Collections));

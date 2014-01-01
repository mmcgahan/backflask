define(
    ['lodash', 'backbone', 'views', 'models', 'collections'],
    function(_, Backbone, Views, Models, Collections) {
        'use strict';
        function fetchRender(model, ViewClass) {
            var view = new ViewClass({ 'model': model });
            model.fetch({
                'success': _.bind(view.render, view)
            });
        }

        var Router = Backbone.Router.extend({
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
        return Router;
    }
);

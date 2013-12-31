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
                fetchRender(new Collections.Posts(), Views.PostList);
            },
            'post': function(postSlug) {
                fetchRender(new Models.Post({ slug: postSlug }), Views.Post);
            }
        });
        return Router;
    }
);

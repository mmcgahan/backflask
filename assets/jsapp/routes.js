define(
    ['backbone', 'views'],
    function(Backbone, Views) {
        'use strict';
        var Router = Backbone.Router.extend({
            routes:{
                'posts/:post': 'renderPost'
            },
            renderPost: function(post) {
                this.postView = new Views.PostView({ model: post });
                this.postView.render();
            }
        });
        return Router;
    }
);

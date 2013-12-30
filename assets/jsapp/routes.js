define(
    ['backbone', 'jsapp/views', 'jsapp/models'],
    function(Backbone, Views, Models) {
        'use strict';
        var Router = Backbone.Router.extend({
            'routes':{
                'posts/:post': 'renderPost'
            },
            'renderPost': function(postSlug) {
                var postInstance = new Models.Post({ slug: postSlug });
                this.postView = new Views.PostView({ model: postInstance });
                this.postView.listenToOnce(postInstance, 'change', this.postView.render);
                postInstance.fetch();
            }
        });
        return Router;
    }
);

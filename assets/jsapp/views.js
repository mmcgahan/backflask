define(
    ['lodash', 'backbone', 'handlebars', 'templates'],
    function(_, Backbone, Handlebars) {
        'use strict';
        var Views = {
            'Root': Backbone.View.extend({
                'el': document.body,
                'template': function() {},  // override this
                'render': function(){
                    this.$el.html(this.template({ 'model': this.model.toJSON() }));
                    return this;
                }
            })
        };

        Views.Post = Views.Root.extend({
            'template': Handlebars.templates.post
        });
        Views.PostList = Views.Root.extend({
            'template': Handlebars.templates.posts
        });

        return Views;
    }
);

define(
    ['lodash', 'backbone', 'handlebars', 'templates'],
    function(_, Backbone, Handlebars) {
        'use strict';
        var Views = {
            'PostView': Backbone.View.extend({
                'el': document.body,
                'template': Handlebars.templates.post,
                'render': function(){
                    this.$el.html(this.template(this.model.toJSON()));
                    return this;
                }
            })
        };
        return Views;
    }
);

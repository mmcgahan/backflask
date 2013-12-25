define(
    ['lodash', 'backbone', 'handlebars'],
    function(_, Backbone, Handlebars) {
        'use strict';
        var Views = {
            PostView: Backbone.View.extend({
                el: $('#body')[0],
                render: function(){
                    var template = Handlebars.templates.post;
                    this.$el.html(template({ post: this.model.attributes }));
                    return this;
                },
                close: function() {

                }
            })
        };
        return Views;
    }
);

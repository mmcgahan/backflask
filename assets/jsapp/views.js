var Backbone = require('backbone');
var Handlebars = require('handlebars');
var Templates = require('./templates')(Handlebars);

module.exports = (function(Backbone, Templates) {
    'use strict';
    var Views = {
        'Root': Backbone.View.extend({
            'el': document.getElementById('body'),
            'template': function() {},  // override this
            'render': function() {
                this.$el.html(this.template({ 'model': this.model.toJSON() }));
                return this;
            }
        })
    };

    Views.Post = Views.Root.extend({
        'template': Templates.post
    });
    Views.PostList = Views.Root.extend({
        'template': Templates.posts
    });

    return Views;
}(Backbone, Templates));

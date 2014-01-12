var Backbone = require('backbone');
var Handlebars = require('handlebars');
var Templates = require('./templates')(Handlebars);
var Router = require('./router');

module.exports = (function(Backbone, Templates, Router) {
    'use strict';
    var Header = Backbone.View.extend({
        'el': document.getElementById('header'),
        'template': Templates.Header,
        'init': function() {
            Router.on('route', this.render, this);
        },
        'render': function() {
            console.log(arguments);
            // for static content, might as well cache the rendered template HTML
            this.cache = this.cache || this.template({ 'title': 'Title' });
            this.$el.html(this.cache);
            return this;
        },
        'cache': null
    });

    return Header;
}(Backbone, Templates, Router));

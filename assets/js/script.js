requirejs.config({
    baseUrl: '/assets',
    paths: {
        'jquery': 'vendor/jquery/jquery',
        'underscore': 'vendor/lodash/dist/lodash',
        'backbone': 'vendor/backbone/backbone',
        'handlebars': 'vendor/handlebars/handlebars.runtime',
        'foundation': 'vendor/foundation/js/foundation',

        'views': 'jsapp/views',
        'models': 'jsapp/models',
        'routes': 'jsapp/routes'
    },
    shim: {
        'backbone': {
            deps: ['underscore']
        }
    }
});

require(['jquery', 'backbone', 'routes', 'foundation'],
    function($, Backbone, Router) {
        'use strict';

        $(document).foundation();
        // var router = new Router();
        new Router();
        Backbone.history.start({pushState: true});
    });

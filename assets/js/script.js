requirejs.config({
    'baseUrl': '/assets',
    'paths': {
        'jquery': 'vendor/jquery/jquery',
        'lodash': 'vendor/lodash/dist/lodash',
        'backbone': 'vendor/backbone/backbone',
        'handlebars': 'vendor/handlebars/handlebars.runtime',
        'foundation': 'vendor/foundation/js/foundation',
        'models': 'jsapp/models',
        'views': 'jsapp/views',
        'collections': 'jsapp/collections',
        'routes': 'jsapp/routes',
        'templates': 'templates/compiled'
    },
    'shim': {
        'handlebars': {
            'exports': 'Handlebars'
        },
        'lodash': {
            'exports': '_'
        },
        'backbone': {
            'deps': ['jquery', 'lodash'],
            'exports': 'Backbone'
        },
        'templates': {
            'deps': ['handlebars']
        }
    },
});

require(['jquery', 'lodash', 'backbone', 'routes', 'foundation'],
    function($, _, Backbone, Router) {
        'use strict';

        $(document).foundation();
        // var router = new Router();
        new Router();
        Backbone.history.start({'pushState': true});
    });

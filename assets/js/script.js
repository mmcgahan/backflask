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
        'routes': 'jsapp/router',
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
            'deps': ['handlebars'],
            'exports': 'Templates'
        }
    },
});

require(['jquery', 'lodash', 'backbone', 'routes', 'foundation'],
    function($, _, Backbone, Router) {
        'use strict';

        new Router();
        Backbone.history.start({ pushState: true, root: '/' });
        // All navigation that is relative should be passed through the navigate
        // method, to be processed by the router. If the link has a `data-bypass`
        // attribute, bypass the delegation completely.
        $(document)
            .foundation()
            .on('click', 'a[href]:not([data-bypass])', function(e) {
                // Get the absolute anchor href.
                var href = { prop: $(this).prop('href'), attr: $(this).attr('href') };
                // Get the absolute root.
                var root = location.protocol + '//' + location.host + '/';

                // Ensure the root is part of the anchor href, meaning it's relative.
                if (href.prop.slice(0, root.length) === root) {
                    // Stop the default event to ensure the link will not cause a page
                    // refresh.
                    e.preventDefault();

                    // `Backbone.history.navigate` is sufficient for all Routers and will
                    // trigger the correct events. The Router's internal `navigate` method
                    // calls this anyways.  The fragment is sliced from the root.
                    Backbone.history.navigate(href.attr, true);
                }
            });
    });

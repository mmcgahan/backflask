requirejs.config({
    baseUrl: '/assets',
    paths: {
        'jquery': 'vendor/jquery/jquery',
        'underscore': 'vendor/lodash/dist/lodash',
        'backbone': 'vendor/backbone/backbone',
        'handlebars': 'vendor/handlebars/handlebars.runtime',
        'foundation': 'vendor/foundation/js/foundation'
    }
});

require(['jquery', 'foundation'],
    function($) {
        'use strict';

        $(document).foundation();
    });

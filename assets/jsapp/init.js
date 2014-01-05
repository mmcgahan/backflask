require('foundation');
var $ = require('jquery');
var Backbone = require('backbone');
var Router = require('../jsapp/router');

$(function() {
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
            var href = { prop: this.href, attr: this.getAttribute('href') };
            // Get the absolute root.
            var root = location.protocol + '//' + location.host + '/';

            // Ensure the root is part of the anchor href, meaning it's relative.
            if (href.prop.slice(0, root.length) === root) {
                e.preventDefault();

                // `Backbone.history.navigate` is sufficient for all Routers and will
                // trigger the correct events. The Router's internal `navigate` method
                // calls this anyways.  The fragment is sliced from the root.
                Backbone.history.navigate(href.attr, true);
            }
        });
});

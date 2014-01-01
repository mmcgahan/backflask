(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../jsapp/router":4}],2:[function(require,module,exports){
var Backbone = require('backbone');
var Models = require('./models');

var API_PREFIX = '/api/';

module.exports = {
    'Posts': Backbone.Collection.extend({
        'url': API_PREFIX + 'posts',
        'model': Models.Post,
        'parse': function(response) {
            'use strict';
            return response.posts;
        }
    })
};

},{"./models":3}],3:[function(require,module,exports){
var Backbone = require('backbone');

var API_PREFIX = '/api/';
var Models = {
    'Post': Backbone.Model.extend({
        'idAttribute': 'slug',
        'urlRoot': API_PREFIX + 'posts'
    })
};
Models.Posts = Backbone.Model.extend({
    'model': Models.Post,
    'url': API_PREFIX + 'posts'
});

module.exports = Models;

},{}],4:[function(require,module,exports){
var _ = require('lodash');
var Backbone = require('backbone');
var Views = require('./views');
var Models = require('./models');
var Collections = require('./collections');

function fetchRender(model, ViewClass) {
    var view = new ViewClass({ 'model': model });
    model.fetch({
        'success': _.bind(view.render, view)
    });
}

var Router = Backbone.Router.extend({
    'routes':{
        // could be simplified by always grabbing collection
        'posts': 'posts',
        'posts/:post': 'post'
    },
    'posts': function() {
        // might be good to cache posts collection and only fetch if empty
        fetchRender(new Collections.Posts(), Views.PostList);
    },
    'post': function(postSlug) {
        // collection-free fetch and render
        // would be good to cache post to avoid subsequent fetch
        fetchRender(new Models.Post({ slug: postSlug }), Views.Post);
    }
});

module.exports = Router;

},{"./collections":2,"./models":3,"./views":6}],5:[function(require,module,exports){
module.exports = function(Handlebars) {

this["Templates"] = this["Templates"] || {};

this["Templates"]["post"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n<div class=\"post\">\n    <h1>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h1>\n    <div>";
  stack2 = ((stack1 = ((stack1 = (depth0 && depth0.content)),stack1 == null || stack1 === false ? stack1 : stack1.html)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</div>\n</div>\n";
  return buffer;
  }

  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.model) { stack1 = stack1.call(depth0, options); }
  else { stack1 = (depth0 && depth0.model); stack1 = typeof stack1 === functionType ? stack1.call(depth0, options) : stack1; }
  if (!helpers.model) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });

this["Templates"]["posts"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<ul class=\"posts\">\n    <li class=\"post\">\n        <p>Read <a href=\"";
  if (stack1 = helpers.uri) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.uri); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></p>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.teaser), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </li>\n</ul>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<p>";
  if (stack1 = helpers.teaser) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.teaser); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.model), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });

return this["Templates"];

};
},{}],6:[function(require,module,exports){
var Backbone = require('backbone');
var Templates = require('./templates');

var Views = {
    'Root': Backbone.View.extend({
        'el': document.body,
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

module.exports = Views;

},{"./templates":5}]},{},[2,3,4,5,6,1])
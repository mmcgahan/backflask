var path = require('path');

module.exports = function(grunt) {
    'use strict';
    var paths = { assets: 'assets/' };
    paths.jsapp = paths.assets + 'jsapp/';
    paths.js = paths.assets + 'js/';
    paths.sass = paths.assets + 'scss/';
    paths.css = paths.assets + 'css/';
    paths.templates = paths.assets + 'templates/';
    paths.bower = paths.assets + 'vendor/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                loadPath: paths.bower + 'foundation/scss'
            },
            dist: {
                style: 'compressed',
                files: {
                    'assets/css/style.css': paths.sass + 'style.scss'
                }
            }
        },
        watch: {
            grunt: { files: ['Gruntfile.js'] },

            sass: {
                files: paths.sass + '**/*.scss',
                tasks: ['sass']
            }
            // handlebars
            // js - browserify, uglify + source map
        },
        handlebars: {
            compile: {
                options: {
                    namespace: 'Templates',
                    processName: function(filePath) {
                        return path.basename(filePath, '.handlebars');
                    },
                    commonjs: true
                },
                files: {
                    'assets/jsapp/templates.js': paths.templates + '*.handlebars'
                }
            }
        },
        browserify: {
            app: {
                src: [
                    paths.jsapp + '*.js',
                    paths.js + 'script.js'
                ],
                dest: paths.js + 'main.js',
                options: {
                    shim: {
                        jquery: {
                            path: paths.bower + 'jquery/jquery.js',
                            exports: '$'
                        },
                        underscore: {
                            path: paths.bower + 'lodash/dist/lodash.underscore.js',
                            exports: '_'
                        },
                        handlebars: {
                            path: paths.bower + 'handlebars/handlebars.runtime',
                            exports: 'Handlebars'
                        },
                        backbone: {
                            path: paths.bower + 'backbone/backbone.js',
                            depends: {
                                underscore: 'underscore',
                                jquery: 'jquery'
                            },
                            exports: 'Backbone'
                        },
                        foundation: {
                            path: paths.bower + 'foundation/js/foundation.js',
                            depends: {
                                jquery: 'jquery'
                            },
                            exports: '$.fn.foundation'
                        }
                    }
                }
            }
        },
        uglify: {
            default: {
                files: {
                    'assets/js/main.ugly.js': paths.js + 'main.js'
                }
            }
        }
        //,
        // concat: {
        //     'assets/js/main.js': ['vendor/vendor.js', paths.js + 'app.js']
        // }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('js', ['handlebars', 'browserify', 'uglify']);
    grunt.registerTask('build', ['sass', 'js']);
    grunt.registerTask('default', ['build','watch']);
};


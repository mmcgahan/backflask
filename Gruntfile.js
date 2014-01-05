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
            dist: {
                style: 'compressed',
                files: {
                    'assets/css/style.css': paths.sass + 'style.scss'
                }
            }
        },
        watch: {
            grunt: { files: ['Gruntfile.js'] },
            styles: {
                files: paths.sass + '**/*.scss',
                tasks: ['styles']
            },
            scripts: {
                files: [
                    paths.jsapp + '*.js',
                    paths.templates + '*.handlebars'
                ],
                tasks: ['scripts']
            }
        },
        handlebars: {  // should replace this with hbsfy transform
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
                    // paths.templates + '*.handlebars',  // TODO hbsfy
                    paths.jsapp + '*.js'
                ],
                dest: paths.js + 'main.js',
                options: {
                    debug: true,
                    // transform: ['hbsfy'],  // TODO
                    shim: {
                        // jquery: {  // no can do for foundation 5 sadface
                        //     path: paths.bower + 'jquery/src/jquery.js',
                        //     exports: '$'
                        // },
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
                                underscore: '_',
                                jquery: '$'
                            },
                            exports: 'Backbone'
                        },
                        foundation: {
                            path: paths.bower + 'foundation/js/foundation.min.js',
                            depends: { jquery: 'jQuery' },
                            exports: '$.fn.foundation'
                        }
                    }
                }
            }
        },
        uglify: {  // TODO sourcemaps
            default: {
                files: {
                    'assets/js/main.ugly.js': paths.js + 'main.js'
                },
                options: {
                    sourceMap: function() { return 'main.ugly.js.map'; }
                }

            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('styles', ['sass']);
    grunt.registerTask('scripts', ['handlebars', 'browserify']);
    grunt.registerTask('build', ['styles', 'scripts']);
    grunt.registerTask('default', ['build','watch']);
    grunt.registerTask('deploy', ['build','uglify']);
};


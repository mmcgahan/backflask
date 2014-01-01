var path = require('path');

module.exports = function(grunt) {
    'use strict';
    var paths = { assets: 'assets/' };
    paths.jsapp = paths.assets + 'jsapp/';
    paths.sass = paths.assets + 'scss/';
    paths.css = paths.assets + 'css/';
    paths.templates = paths.assets + 'templates/';
    paths.bower = paths.assets + 'vendor/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                includePaths: [paths.bower + 'foundation/scss']
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'assets/css/app.css': paths.sass + 'app.scss'
                }
            }
        },
        watch: {
            grunt: { files: ['Gruntfile.js'] },

            sass: {
                files: paths.sass + '**/*.scss',
                tasks: ['sass']
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: 'Templates',
                    processName: function(filePath) {
                        return path.basename(filePath, '.handlebars');
                    }
                },
                files: {
                    'assets/templates/compiled.js': paths.templates + '*.handlebars'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['sass', 'handlebars']);
    grunt.registerTask('default', ['build','watch']);
};


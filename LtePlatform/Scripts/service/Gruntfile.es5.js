"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            "bar": {
                "files": {
                    'url/core.min.js': ['url/core.js']
                }
            }
        },
        concat: {
            "foo": {
                "files": {
                    'app/url.js': ['url/core.js', 'url/menu.js', 'url/format.js', 'url/geometry.js', 'url/calculation.js', 'url/app.url.js'],
                    'app/region.js': ['region/basic.js', 'region/authorize.js', 'region/college.js', 'region/network.js', 'region/app.region.js'],
                    'app/kpi.js': ['kpi/core.js', 'kpi/college.js', 'kpi/coverage.js', 'kpi/customer.js', 'kpi/parameter.js', 'kpi/work.js', 'kpi/app.kpi.js'],
                    'app/topic.js': ['topic/basic.js', 'topic/parameters.js', 'topic/college.js', 'topic/dialog.js', 'topic/baidu.map.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['uglify', 'concat']);
};


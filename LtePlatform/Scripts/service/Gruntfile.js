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
                    'app/url.js': ['url/core.js', 'url/menu.js', 'url/format.js', 'url/geometry.js', 'url/calculation.js', 'url/app.url.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['uglify', 'concat']);
};

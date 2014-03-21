module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            react: {
                files: 'src/views/*.jsx',
                tasks: ['browserify']
            }
        },

        browserify: {
            options: {
                transform: [ require('grunt-react').browserify ]
            },
            client: {
                src: ['src/views/**/*.jsx'],
                dest: 'build/app.built.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'browserify'
    ]);
};
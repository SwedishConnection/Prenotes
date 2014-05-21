module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      react: {
        files: 'src/views/*.jsx',
        tasks: ['browserify']
      }
    },

    clean: {
      build: {
        src: ['build']
      }
    },

    browserify: {
      options: {
        transform: [ require('grunt-react').browserify ]
      },

      client: {
        src: ['src/views/**/*.jsx'],
        dest: 'build/javascript/views-react.js'
      }
    },

    copy: {
      statics: {
        cwd: 'src/static',
        src: ['index.html'],
        dest: 'build',
        expand: true
      },

      app: {
        cwd: 'src',
        src: ['app.js'],
        dest: 'build',
        expand: true
      },

      libs: {
        cwd: 'src/lib',
        src: ['**/*.js'],
        dest: 'build/lib',
        expand: true
      }
    }
  });


  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');


  grunt.registerTask('default', [
    'clean', 'browserify', 'copy'
  ]);
};

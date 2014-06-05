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
      dist: {
        files: {
          'build/bundle.js' : ['src/views/**/*.jsx']
        }
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
      },

      settings: {
        src: ['<%= pkg.settings %>'],
        dest: 'build/lib/config',
        expand: true
      }
    },

    bower: {
      install: {
      }
    }
  });


  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-task');


  grunt.registerTask('default', [
    'clean', 'browserify', 'copy'
  ]);
};

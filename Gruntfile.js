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
      javascript: {
        options: {
          transform: ['browserify-shim', require('grunt-react').browserify]
        },
        files: {
          'build/client/scripts/bundle-react.js' : ['src/views/**/*.jsx']
        }
      }
    },

    copy: {
      statics: {
        cwd: 'src/static',
        src: ['index.html'],
        dest: 'build/client',
        expand: true
      },

      app: {
        cwd: 'src',
        src: ['app.js'],
        dest: 'build/server',
        expand: true
      },

      libs: {
        cwd: 'src/lib',
        src: ['**/*.js'],
        dest: 'build/server/lib',
        expand: true
      },

      settings: {
        src: ['<%= pkg.settings %>'],
        dest: 'build/server/lib/config',
        expand: true
      },

      fonts: {
        src: ['lib/bootstrap/glyphicons-halflings-regular.*'],
        dest: 'build/client/fonts',
        expand: true
      }
    },

    concat: {
      css: {
        src: 'lib/bootstrap/*.css',
        dest: 'build/client/styles/bundle.css'
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-task');


  grunt.registerTask('default', [
    'clean', 'browserify', 'copy', 'concat'
  ]);
};

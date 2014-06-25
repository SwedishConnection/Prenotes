/**
   Copyright 2014 Swedish Connection
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
   limitations under the License.
*/
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
        src: ['lib/bootstrap/*.css', 'static/prenotes.css'],
        dest: 'build/client/styles/bundle.css'
      }
    },

    bower: {
      install: {
      }
    },

    docco: {
      doc: {
        src: ['src/app.js', 'src/lib/config/logging.js', 'src/views/App.jsx'],
        options: {
          output: 'doc/',
          languages : {
            ".jsx": {"name": "javascript", "symbol": "//"}
          }
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-docco');


  grunt.registerTask('default', [
    'clean', 'browserify', 'copy', 'concat'
  ]);
};

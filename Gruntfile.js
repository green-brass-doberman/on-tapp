// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {
  // load up all of the necessary grunt plugins
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-casperjs');

  // in what order should the files be concatenated
  var clientIncludeOrder = require('./include.conf.js');

  // grunt setup
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // create a task called clean, which
    // deletes all files in the listed folders
    clean: {
      dist: 'dist/*',
      results: 'results/*'
    },

    // configure jshint to validate js files
    jshint: {
      gruntfile: 'Gruntfile.js',
      client: 'client/js/*.js',
      server: 'server/*.js',
      options: {
        reporter: require('jshint-stylish')
        // use jshint-stylish to make our errors look and read good
      }
    },

    // uglify the files
    uglify: {
      todo: {
        files: {
          'dist/client/js/app-ugly.js': clientIncludeOrder
        }
      }
    },

    // compile less stylesheets to css
    less: {
      build: {
        files: {
          'dist/client/styles/style.css': 'client/styles/*.less'
        }
      }
    },

    // configure cssmin to minify css files
    cssmin: {
      build: {
        files: {
          'dist/client/styles/style.min.css': 'dist/client/styles/style.css'
        }
      }
    },

    // copy necessary files to our dist folder
    copy: {
      // create a task for client files
      client: {
        // Copy everything but the to-be-concatenated todo JS files
        src: [ 'client/**', '!client/js/**', '!client/styles/**' ],
        dest: 'dist/',
      },
      // create a task for server files
      server: {
        src: [ 'server/**' ],
        dest: 'dist/'
      }
    },

    // concat all the js files
    concat: {
      client: {
        files: {
          // concat all the todo js files into one file
          'dist/client/app-concat.js' : 'client/js/**'
        }
      }
    },

    // configure the server
    express: {
      dev: {
        options: {
          script: 'index.js'
        }
      }
    },

    // configure karma
    karma: {
      options: {
        configFile: 'karma.conf.js',
        reporters: ['progress', 'coverage']
      },
      // Watch configuration
      watch: {
        background: true,
        reporters: ['progress']
      },
      // Single-run configuration for development
      single: {
        singleRun: true,
      },
      // Single-run configuration for CI
      ci: {
        singleRun: true,
        coverageReporter: {
          type: 'lcov',
          dir: 'results/coverage/'
        }
      }
    },

    // configure casperjs
    casperjs: {
      options: {},
      e2e: {
        files: {
          'results/casper': 'test/e2e/**/*.js'
        }
      }
    },

    // create a watch task for tracking
    // any changes to the following files
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'jshint:gruntfile'
      },
      client: {
        files: [ 'client/**' ],
        tasks: [ 'build', 'karma:watch:run', 'casperjs' ]
      },
      server: {
        files: [ 'server/**' ],
        tasks: [ 'build', 'express:dev', 'casperjs' ],
        options: {
          spawn: false // Restart server
        }
      },
      unitTests: {
        files: [ 'test/unit/**/*.js' ],
        tasks: [ 'karma:watch:run' ]
      },
      integrationTests: {
        files: [ 'test/integration/**/*.js' ],
        tasks: [ 'karma:watch:run' ]
      },
      e2eTests: {
        files: [ 'test/e2e/**/*.js' ],
        tasks: [ 'casperjs' ]
      }
    },
  });

  // Perform a build
  grunt.registerTask('build', [ 'jshint', 'clean', 'copy', 'concat', 'uglify']);

  // Run e2e tests once
  grunt.registerTask('teste2e', [ 'express:dev', 'casperjs' ]);

  // Run client tests once
  grunt.registerTask('testClient', [ 'karma:single' ]);

  // Run all tests once
  grunt.registerTask('test', [ 'testClient', 'teste2e']);

  // Run all tests once
  grunt.registerTask('ci', [ 'karma:ci', 'express:dev', 'casperjs' ]);

  // Start watching and run tests when files change
  // grunt.registerTask('default', [ 'build', 'express:dev', 'karma:watch:start', 'watch' ]);
  grunt.registerTask('default', ['express:dev', 'karma:watch:start', 'watch' ]);
};

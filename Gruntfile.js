module.exports = function(grunt) {
  // load up all of the necessary grunt plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha');


  // in what order should the files be concatenated
  var clientIncludeOrder = require('./include.conf.js');

  // grunt setup
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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

    // create a watch task for tracking
    // any changes to the following files
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
      },
      unitTests: {
        files: [ 'test/unit/**/*.js' ],
        tasks: [ 'karma:watch:run' ]
      },
      integrationTests: {
        files: [ 'test/integration/**/*.js' ],
        tasks: [ 'karma:watch:run' ]
      }
    }
  });

  // Start watching and run tests when files change
  grunt.registerTask('default', [ 'karma:watch:start', 'watch' ]);
};

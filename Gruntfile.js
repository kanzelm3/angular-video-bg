/*jslint node: true */
'use strict';

var pkg = require('./package.json');

module.exports = function (grunt) {

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    connect: {
      main: {
        options: {
          port: 9001
        }
      }
    },
    watch: {
      main: {
        options: {
            livereload: true,
            livereloadOnError: false,
            spawn: false
        },
        files: ['./*.js','./*.html'],
        tasks: [] //all the tasks are run dynamically during the watch event handler
      }
    },
    jshint: {
      main: {
        options: {
            jshintrc: '.jshintrc'
        },
        src: ['angular-video-bg.js','angular-video-bg-spec.js']
      }
    },
    clean: {
        src:['temp']
    },
    strip : {
      main : {
        src: 'angular-video-bg.js',
        dest: 'temp/angular-video-bg.js'
      }
    },
    uglify: {
      main: {
        src: 'temp/angular-video-bg.js',
        dest:'angular-video-bg.min.js'
      }
    },
    karma: {
      options: {
        frameworks: ['jasmine'],
        files: [  //this files data is also updated in the watch handler, if updated change there too
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'angular-video-bg.js',
            'angular-video-bg-spec.js'
        ],
        logLevel:'ERROR',
        reporters:['mocha'],
        autoWatch: false, //watching is handled by grunt-contrib-watch
        singleRun: true
      },
      all_tests: {
        browsers: ['PhantomJS','Chrome','Firefox']
      },
      during_watch: {
        browsers: ['PhantomJS']
      }
    }
  });

  grunt.registerTask('build',['jshint','clean','strip','uglify','clean']);
  grunt.registerTask('serve', ['jshint','connect', 'watch']);
  grunt.registerTask('test',['karma:all_tests']);

  grunt.event.on('watch', function(action, filepath) {
    //https://github.com/gruntjs/grunt-contrib-watch/issues/156

    var tasksToRun = [];

    if (filepath.lastIndexOf('.js') !== -1 && filepath.lastIndexOf('.js') === filepath.length - 3) {

      //lint the changed js file
      grunt.config('jshint.main.src', filepath);
      tasksToRun.push('jshint');

      //find the appropriate unit test for the changed file
      var spec = filepath;
      if (filepath.lastIndexOf('-spec.js') === -1 || filepath.lastIndexOf('-spec.js') !== filepath.length - 8) {
        spec = filepath.substring(0,filepath.length - 3) + '-spec.js';
      }

      //if the spec exists then lets run it
      if (grunt.file.exists(spec)) {
        tasksToRun.push('karma:during_watch');
      }
    }

    grunt.config('watch.main.tasks',tasksToRun);

  });
};

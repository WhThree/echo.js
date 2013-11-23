module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jasmine: {
      src: 'src/**/*.js',
      options: {
        specs: 'test/jasmine/*.js'
      }
    },
    jshint: {
      all: [
      'Gruntfile.js',
      'src/**/*.js',
      'test/**/*.js'
      ],
      // options: {
      //   jshintrc: '.jshintrc'
      // }
    },
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9000,
          base: [
          'src',
          'test/casperjs/docroot'
          ]
        }
      }
    },
    casperjs: {
      options: {
        async: {
          parallel: false
        }
      },
      files: ['test/casperjs/*.js']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-casperjs');

  // Default task(s).
  grunt.registerTask('test', ['jshint', 'jasmine', 'connect', 'casperjs']);
  grunt.registerTask('default', ['test','uglify']);

};

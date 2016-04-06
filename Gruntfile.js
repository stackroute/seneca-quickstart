exports = module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      test: {
        src: ['**/*.spec.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['mochaTest']);
}
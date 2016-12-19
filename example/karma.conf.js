module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS', 'SlimerJS'],
    frameworks: ['jasmine'],
    reporters: ['progress', 'json-result'],
    plugins: [
      'karma-jasmine', 
      'karma-phantomjs-launcher',
      'karma-slimerjs-launcher',
      require('../index.js')
    ],
    files: ['tests.js'],
    jsonResultReporter: {
      outputFile: "result.json"
    }
  });
};
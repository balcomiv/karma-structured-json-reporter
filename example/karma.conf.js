module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    reporters: ['json-result'],
    plugins: [
      'karma-jasmine', 
      'karma-phantomjs-launcher',
      require('../index.js')
    ],
    files: ['tests.js'],
    jsonResultReporter: {
      outputFile: "result.json"
    }
  });
};
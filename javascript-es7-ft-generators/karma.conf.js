var webpackConfig = require('./webpack.config');
webpackConfig.entry = {};

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'es6-shim'],
    files: ['karma.loader.js'],
    exclude: [],
    preprocessors: {
      'karma.loader.js': ['webpack']
    },

    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    // logLevel: config.LOG_DEBUG, // To enable console.log prints
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  })
}

module.exports = {
  entry: [
    'babel-polyfill',
    './src/app.js'
  ],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',
        query: {
          plugins: ['transform-async-to-generator', 'transform-runtime'],
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  watch: true
};

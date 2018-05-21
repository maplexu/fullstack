const pathlib = require('path');

module.exports = {
  mode: 'development',
  entry:      pathlib.resolve(__dirname, 'src/es6'),
  output: {
    path:     pathlib.resolve(__dirname, 'dest'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
}

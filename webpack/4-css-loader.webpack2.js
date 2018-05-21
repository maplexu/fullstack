const pathlib = require('path');
const Webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry:    pathlib.resolve(__dirname, 'src/useCss.js'),
  output: {
    path:   pathlib.resolve(__dirname, 'dest'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase:  pathlib.resolve('static'),
    port:         8090,
    hot:          true,
    inline:       true,
    historyApiFallback: true,
    open: true
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ]
}

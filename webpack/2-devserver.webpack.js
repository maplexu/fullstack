const pathlib = require('path');
const Webpack = require('webpack');


module.exports = {
  mode: 'development',
  entry:  './src/index',
  output: {
    path:   pathlib.resolve('dest'),
    filename: 'bundle.js'
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase:    pathlib.resolve('static'),
    port:           8090,
    hot:           true,
    inline:         true,
    historyApiFallback: true,
    open:               true
  }
};

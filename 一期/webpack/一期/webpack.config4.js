const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, "src/main4.js"),
  output: {
    filename: "bundle4.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: './dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|jpeg|gif|tif|psd|ico)$/i,
        use: ['file-loader']
      }
    ]
  }
}

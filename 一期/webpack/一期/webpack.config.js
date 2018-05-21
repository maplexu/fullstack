// const path = require('path');
//
// module.exports = {
//   entry: path.resolve(__dirname, "src/main.js"),
//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "dist")
//   }
// }


const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, "src/main4.js"),
  output: {
    filename: "bundle4.js",
    path: path.resolve(__dirname, "build/static")
  },
  devServer: {
    contentBase: './build/',
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|jpeg|gif|tif|psd|ico)$/i,
        use: [
          // "file-loader"
          {
            loader: 'file-loader',
            options: {
              publicPath: 'static/'
            }
          }
        ]
      }
    ]
  }
}

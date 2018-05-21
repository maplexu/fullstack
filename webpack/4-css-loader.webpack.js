const pathlib = require('path');

module.exports = {
  entry:    pathlib.resolve(__dirname, 'src/useCss.js'),
  output: {
    path:   pathlib.resolve(__dirname, 'dest'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
}

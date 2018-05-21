const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, "src/main2.js"),
  output: {
    filename: "bundle2.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
}

const pathlib = require('path');

module.exports = {
  mode: 'development',
  entry: './src/1.ts',
  output: {
    path: pathlib.resolve('dest'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx']
  },
  module: {
    rules: [
      {test: /\.tsx?$/, use: 'ts-loader'}
    ]
  }
}

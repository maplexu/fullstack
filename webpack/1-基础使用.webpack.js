const pathlib = require('path');


module.exports = {
  entry: pathlib.resolve(__dirname, './src/index.js'),
  output: {
    path: pathlib.resolve('dest/'),
    filename: 'bundle.js'
  }
}

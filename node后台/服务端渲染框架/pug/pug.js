const pug = require('pug');

console.log(pug.renderFile('./template.pug', {
  pretty: true,
  name: 'blue',
  a: 12, b: 5,
  arr: [1, 2, 3, 4, 5]
}))

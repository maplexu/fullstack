const path = require('path');

let str = '/var/local/www/aaa/1.png';

console.log(path.parse(str));
console.log(path.dirname(str));
console.log(path.basename(str));
console.log(path.extname(str));

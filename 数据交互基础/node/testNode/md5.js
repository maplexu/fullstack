const crypto = require('crypto');

let md5 = crypto.createHash('md5');

let result = md5.update('1').update('234').update('56').digest('hex');

console.log(result);

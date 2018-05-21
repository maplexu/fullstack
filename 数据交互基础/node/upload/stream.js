const fs = require('fs');

let rs = fs.createReadStream('1.png');
let ws = fs.createWriteStream('3.png');

rs.pipe(ws);

rs.on('error', error => {
  console.log('读取失败');
})

ws.on('finish', () => {
  console.log('写入完成');
})

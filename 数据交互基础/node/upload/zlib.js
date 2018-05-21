const zlib = require('zlib');
const fs = require('fs');

let rs = fs.createReadStream('jquery.js');
let ws = fs.createWriteStream('jquery11.js.gz');

let gz = zlib.createGzip();

rs.pipe(gz).pipe(ws);

ws.on('error' , error => {
  console.log(error);
})
ws.on('finish', () => {
  console.log('jquery文件压缩完成');
})

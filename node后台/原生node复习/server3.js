//处理文件post请求

const http = require('http');

let server = http.createServer((req, res) => {
  let arr = [];
  req.on('data', buffer => {
    arr.push(buffer);
  })
  req.on('end', () => {
    let buffer = Buffer.concat(arr);

    console.log(buffer);      //具体的如何对该数据进行解析详见之前的内容
    res.write('aaa');
    res.end();
  })
})
server.listen(8080);

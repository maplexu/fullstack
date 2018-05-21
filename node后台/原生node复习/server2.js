//处理普通post请求：
const http = require('http');
const querystring = require('querystring');

let server = http.createServer((req, res) => {
  let arr = [];
  req.on('data', data => {
    arr.push(data);
  })
  req.on('end', () => {
    let params = querystring.parse(Buffer.concat(arr).toString());
    console.log(params);

    res.write('aaaa');
    res.end();
  })
})
server.listen(8080);

//处理普通get请求

const http = require('http');
const urllib = require('url');

let server = http.createServer((req, res) => {
  let {pathname, query} = urllib.parse(req.url, true);    //true表示解析生成一个字符串

  console.log(pathname, query);
  res.write('aaa');
  res.end();
})
server.listen(8080);

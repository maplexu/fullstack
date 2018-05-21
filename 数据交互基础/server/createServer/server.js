const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  var obj = url.parse(req.url, true);

  let { pathname, query } = obj;

  console.log(pathname);
  console.log(query);
  res.write('ok');
  res.end();
})

server.listen(8080);

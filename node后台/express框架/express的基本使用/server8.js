//使用中间件处理cookie

const express = require('express');
const cookieParser = require('cookie-parser');

let server = express();
server.listen(8080);

server.use(cookieParser({}));
server.get('/a', (req, res) => {
  console.log(req.cookies);

  res.cookie('b', 5, {});
  res.send('aaa');
})

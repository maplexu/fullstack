//使用中间件处理cookie

const express = require('express');
const cookieParser = require('cookie-parser');

let server = express();
server.listen(8080);

server.use(cookieParser('asdasdsfasfaqwrqwasssssssssfarfqwr'));
server.get('/a', (req, res) => {
  console.log(req.cookies);
  console.log(req.signedCookies)

  res.cookie('b', 5, {signed: true});
  res.send('aaa');
})

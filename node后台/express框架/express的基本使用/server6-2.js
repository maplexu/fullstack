//处理普通post请求

const express = require('express');
const path = require('path');
const mybody = require('libs/my-body');

let server = express();
server.listen(8080);

server.use(mybody);

server.post('/a', (req, res, next) => {
  console.log(req.body);
})

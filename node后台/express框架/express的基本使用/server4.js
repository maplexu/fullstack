//中间件实现流水线操作

const express = require('express');
const path = require('path');


let server = express();
server.listen(8080);

server.get('/a', (req, res, next) => {
  console.log('aaa');
  next();
})
server.get('/a', (req, res) => {
  console.log('bbb');
})

//处理普通post请求

const express = require('express');
const path = require('path');
const body = require('body-parser');

let server = express();
server.listen(8080);

server.use(body.urlencoded({extended: false}));

server.post('/a', (req, res, next) => {
  console.log(req.body);
})

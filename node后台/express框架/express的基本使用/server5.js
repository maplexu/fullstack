//处理get请求

const express = require('express');
const path = require('path');


let server = express();
server.listen(8080);

server.get('/a', (req, res, next) => {
  console.log(req.query);
})

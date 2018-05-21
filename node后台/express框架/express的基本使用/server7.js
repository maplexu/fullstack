//处理文件post请求

const express = require('express');
const multer = require('multer');

let server = express();
server.listen(8080);

server.use(multer({dest: 'upload/'}).any());

server.post('/upload', (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
})

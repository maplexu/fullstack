//返回文件

const express = require('express');
const path = require('path');


let server = express();
server.listen(8080);

server.get('/1.html', function(req, res){
  console.log(req.url);
  res.sendFile(path.resolve(`www${req.url}`));
})

//server.use(express.static('www/'));

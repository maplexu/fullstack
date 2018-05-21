const express = require('express');

let server = express();
server.listen(8080);

server.get('/a', function(req, res){
  console.log('请求a');
  res.write('aaa');
  res.end();
})

server.post('/b', function(req, res){
  console.log('请求b');
  res.send([1, 2, 4]);
})

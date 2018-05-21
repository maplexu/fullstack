const express = require('express');

let server = express();
server.listen(8080);

server.get('/a', function(){
  console.log('请求a');
})

server.post('/b', function(){
  console.log('请求b');
})

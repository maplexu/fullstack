const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url);
  fs.readFile(`www${req.url}`, (err, data) => {
    if(err){
      res.write('404');
    }else{
      res.write(data);
    }
    res.end();
  })
})

server.listen(8080);

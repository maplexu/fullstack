const http = require('http');
const fs = require('fs');
const url = require('url');


let server = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url);
  console.log(pathname);
  //读取文件日期
  fs.stat(`www${pathname}`, (err, stat) => {
    if(err){
      res.writeHeader(404);
      res.write('Not Found');
      res.end();
    }else{
      if(req.headers['if-modified-since']){
        let oDate = new Date(req.headers['if-modified-since']);
        let client_time = Math.floor(oDate.getTime()/1000);
        let server_time = Math.floor(stat.mtime.getTime()/1000);

        if(server_time > client_time){
          sendFileToClient();
        }else{
          res.writeHeader(304);
          res.write('Not Modified11');
          res.end();
        }
      }else{
        sendFileToClient();
      }
    }
  })

  function sendFileToClient(){
    //读取文件:
    let rs = fs.createReadStream(`www${pathname}`);

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Last-Modified', stat.mtime.toUTCString());
    rs.pipe(res);

    rs.on('error', error => {
      res.writeHeader(404);
      res.write('Not Found');
      res.end();
    })
  }
});

server.listen(8080);

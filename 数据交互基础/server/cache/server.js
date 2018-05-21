const http = require('http');
const fs = require('fs');
const url = require('url');

let server = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url);
  console.log(pathname);
  //改进1：获取文件的最后修改日期，在第一次接收到请求时发送出去
  fs.stat(`www${pathname}`, (err, stat) => {
    if(err){  //若文件不存在
      console.log(err);
      res.writeHeader(404);
      res.write('Not Found');
      res.end();
    }else{
      if(req.headers['if-modified-since']){     //判断请求头中是否有if-modified-since字段，没有的话就是第一次请求
        let oDate = new Date(req.headers['if-modified-since']);
        let client_time = Math.floor(oDate.getTime()/1000);
        let server_time = Math.floor(stat.mtime.getTime()/1000);

        if(server_time > client_time){      //服务器端文件的修改时间 > 客户端手里的版本
          sendFileToClient();
        }else{
          console.log(304)
          res.writeHeader(304);
          res.write('Not Modified');
          res.end();
        }
      }else{
        sendFileToClient();
      }

      //封装发送响应的操作（发送请求文件的新版本，并且设置Last-Modified头）
      function sendFileToClient(){
        //发送
        console.log(200);
        let rs = fs.createReadStream(`www${pathname}`);

        res.setHeader('Last-Modified', stat.mtime.toGMTString());
        //输出
        rs.pipe(res);

        rs.on('error', errpr => {
          res.writeHeader(404);
          res.write('Not Found');
          res.end();
        })
      }
    }
  })

  //最初始的代码
  // let rs = fs.createReadStream(`www${pathname}`);
  // rs.pipe(res);
  //
  // rs.on('error', error => {
  //   console.log(error);
  //   res.writeHeader(404);
  //   res.write('Not Found');
  //   res.end();
  // })
})

server.listen(8081);

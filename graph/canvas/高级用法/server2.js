const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if(req.url == '/upload_base64'){
    //处理数据交互请求：
    let arr = [];
    req.on('data', data => {
      arr.push(data);
    })
    req.on('end', () => {
      let buffer = Buffer.concat(arr);
      let filename = Math.random() + '.png';
      console.log(1);
      fs.writeFile(filename, decodeURIComponent(buffer.toString().replace(/^col=/, '')).replace(/^data:[^,]+base64,/, ''), 'base64', err => {
        if(err){
          console.log(err);
          res.write(err);
        }else{
          // fs.readFile(filename, (err, data) => {
          //   res.setHeader('Content-Disposition', 'attachment; filename=download.png');
          //   res.end(data);
          // })
          let buff = new Buffer(decodeURIComponent(buffer.toString().replace(/^col=/, '')).replace(/^data:[^,]+base64,/, ''), 'base64');
          res.setHeader('Content-Disposition', 'attachment; filename=download.png');
          res.end(buff);
        }
      })
    })
  }else{
    //处理静态文件请求：
    fs.readFile(`www${decodeURIComponent(req.url)}`, (err, data) => {
      if(err){
        res.write('404');
      }else{
        res.write(data);
      }
      res.end();
    })

  }
}).listen(8080);

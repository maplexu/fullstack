const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if(req.url == '/upload_base64'){
    //处理数据请求
    let arr = [];
    req.on('data', data => {
      arr.push(data);
    })
    req.on('end', ()=>{
      let buffer = Buffer.concat(arr);
      let filename = Math.random() + '.png';
      console.log('抽取前一百个字符：' + buffer.toString().substr(0, 100));
      fs.writeFile(filename, decodeURIComponent(buffer.toString()).replace(/^data:[^,]+;base64,/, ''), 'base64', err => {
        if(err){
          console.log(err);
        }else{
          res.write('图片保存成功');
        }
        res.end();
      })
    })
  }else{
    //处理静态文件请求
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

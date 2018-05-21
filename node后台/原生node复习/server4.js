const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const cluster = require('cluster');
const os = require('os');

//开启多进程(能有效放置服务器挂了)
if(cluster.isMaster){
  for(let i = 0; i < os.cpus().length; i++){
    cluster.fork();
  }
}else{
  let server = http.createServer((req, res) => {
    //这里采用流式操作来处理文件的读取，压缩，返回
    let rs = fs.createReadStream(`www${req.url}`);
    let gz = zlib.createGzip();

    res.setHeader('content-encoding', 'gzip');

    rs.pipe(gz).pipe(res);
    rs.on('error', function(){
      res.setHeader('content-encoding', '');
      res.writeHeader('404');
      res.write('Not Found');
      res.end();
    });
  });
  server.listen(8080);
}

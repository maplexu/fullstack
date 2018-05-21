//多进程

const http = require('http');
const cluster = require('cluster');
const os = require('os');
const process = require('process');

if(cluster.isMaster){
  for(let i = 0; i < os.cpus().length; i++){
    cluster.fork();
  }
  console.log('主进程');
}else{
  let server = http.createServer((req, res) => {
    console.log(process.pid);

    res.write('aaa');
    res.end();
  })

  server.listen(8080);

  console.log('服务器开好了，在8080上');
}

const http = require('http');
const io = require('socket.io');

let httpServer = http.createServer((req, res) => {

});
httpServer.listen(8080);

let wsServer = io.listen(httpServer);

//定义一个数组，专门用户当前通过ws连接到服务器的用户
let aSock = [];
wsServer.on('connection', sock => {
  //每当有一个客户端连接上来，就添加进数组中
  aSock.push(sock);

  //当有浏览器端断开连接时，监听到，这里将断开的客户端从数组中删除
  sock.on('disconnect', ()=> {
    let n = aSock.indexOf(sock);

    if(n != -1){
      aSock.splice(n, 1);
    }
  });
  sock.on('connection', sock => {
    console.log('有客户端连进来了');
  })
  sock.on('msg', str => {
    aSock.forEach( s => {
      if(s != sock){
        s.emit('msg', str);
      }
    })
  })
});

setInterval(function(){
  console.log(aSock.length);
}, 500)

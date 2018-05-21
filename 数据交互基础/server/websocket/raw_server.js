const http = require('http');
const net = require('net');
const crypto = require('crypto');


//不能使用http服务去处理ws请求
// let server = http.createServer((req, res) => {
//   console.log('连接');
// });
// server.listen(8080);

//使用net服务
let server = net.createServer(sock => {
  console.log('连接');

  //数据过来----只有第一次数据过来才是握手
  sock.once('data', data => {
    console.log('握手开始');

    console.log(data.toString());   //第一次过来的数据就是请求头的内容，可打印出来查看

    let str = data.toString();
    let lines = str.split('\r\n');

    //舍弃第一行和最后两行
    lines = lines.slice(1, lines.length-2);

    //用; 切开每条数据
    let headers = {};
    lines.forEach(line => {
      let [key, val] = line.split(': ');
      headers[key.toLowerCase()] = val;
    })

    console.log(headers);
    if(headers['upgrade'] != 'websocket'){
      console.log('是其他的协议', headers['upgrade']);
      sock.end();
    }else if(headers['sec-websocket-version'] != 13){
      console.log('版本不对', headers['sec-websocket-version']);
      sock.end();
    }else{
      let key = headers['sec-websocket-key'];
      let mask = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';


      let hash = crypto.createHash('sha1');
      hash.update(key+mask);
      let key2 = hash.digest('base64');

      sock.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ${key2}\r\n\r\n`);
      console.log('握手结束');

      sock.on('data', data => {
        console.log('有数据');
        console.log(data);
      })
    }
  });
  //断开了
  sock.on('end', () => {
    console.log('客户端已经断开了');
  })
})

server.listen(8080);

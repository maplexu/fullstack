const express = require('express');
const body = require('body-parser');
const multer = require('multer');

//旧的创建服务器的写法：
//let server = http.createServer();
//server.listen(8080);

//express的写法：
let server = express();   //创建一个服务
server.listen(8080);      //同样也需要监听端口

//使用body-parser中间件
server.use(body.urlencoded({extended: false}));

//使用multer中间件
let multerObj = multer({dest: './upload'});   //定义文件的存储位置
server.use(multerObj.any());            //any模式表示可接收任意格式的文件


//处理请求：
server.post('/api', (req, res) => {
  if(req.headers['origin'] == 'null' || req.headers['origin'].startsWith('http://localhost')){
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.send('OK');

  console.log(req.body);    //req.body就是通过body-parser中间件处理后得到的结果
  console.log(req.files);   //req.files就是通过multer中间件处理后得到的结果
});

//使用express自带的中间件，用于处理静态文件的请求；
//当有对静态文件的请求时，它会去定义的文件夹中读取文件，并会自动完成打包，缓存...工作
server.use(express.static('./www'));

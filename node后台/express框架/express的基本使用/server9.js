//使用中间件处理cookie

const express = require('express');
const cookieSession = require('cookie-session');

let server = express();
server.listen(8080);

server.use(cookieSession({
  keys: ['afsfasfasdfsadf', 'xcvxchdftyuftuyfy', 'asdgsdrgse5t6tr5', 'fgdfghfty8654esdghfjhg'],
  //secret: 'xxx'
}))

server.get('/a', (req, res) => {
  if(!req.session['count']){
    req.session.count = 1;
  }else{
    req.session.count ++;
  }

  res.send(`欢迎您第${req.session.count}次来访`);
})

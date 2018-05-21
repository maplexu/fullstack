const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');


let users = {
  'blue': '123456',
  'zhangsan': '654321'
}

let server = http.createServer((req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  //GET
  let { pathname, query } = url.parse(req.url, true);

  //POST
  let str = '';
  req.on('data', data => {
    str += data;
  })
  req.on('end', () => {
    let post = querystring.parse(str);

    //根据请求的类型获取请求的数据
    if(req.method.toLowerCase() == 'get'){
      var { user, pass } = query;
    }else{
      var { user, pass } = post;
    }
    console.log(pathname);
    console.log(user, pass);
    //根据请求的路径判断是那种操作（注册/登录）
    switch(pathname) {
      //处理注册：
      case '/reg':
        if(!user){
          res.write('{"err": 1, "msg": "user is required"}');
        }else if(!pass){
          res.write('{"err": 1, "msg": "password is required"}');
        }else if(!/^\w{4,32}$/.test(user)){     //用户名长度为4-32位
          res.write('{"err": 1, "msg": "invalid username"}');
        }else if(/^['|"]$/.test(pass)){         //密码中不能包含引号
          res.write('{"err": 1, "msg": "invalid password"}');
        }else if(users[user]){
          res.write('{"err": 1, "msg": "username already exists"}');
        }else{
          users[user] = pass;
          res.write('{"err": 0, "msg": "success"}');
        }
        res.end();
        break;
      //处理登录：
      case '/login':
        if(!user){
          res.write('{"err": 1, msg: "user is required"}');
        }else if(!pass){
          res.write('{"err": 1, msg: "password is required"}');
        }else if(!/^\w{4,32}$/.test(user)){           //{4,32}逗号后面不能加空格
          res.write('{"err": 1, "msg": "invalid username"}');
        }else if(/^['|"]$/.test(pass)){
          res.write('{"err": 1, "msg": "invalid password"}');
        }else if(!users[user]){
          res.write('{"err": 1, "msg": "no this user"}');
        }else if(users[user] != pass){
          res.write('{"err": 1, "msg": "username or password is incorrect"}');
        }else{
          res.write('{"err": 0, "msg": "success"}');
        }
        res.end();
        break;
      //其他情况都视为对静态资源文件的请求
      default:
        fs.readFile(`www${pathname}`, (err, data) => {
          if(err){
            res.writeHeader(404);
            res.write('Not Found');
          }else{
            res.write(data);
          }

          res.end();
        })
    }
  })
})
server.listen(8080);

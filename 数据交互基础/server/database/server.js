const http = require('http');
const mysql = require('mysql');
const fs = require('fs');
const url = require('url');
const zlib = require('zlib');
const crypto = require('crypto');

//定义的一串用于md5加密时拼接进去的字符串
const _key = 'sadfslekrtuew5iutoselgdtjiypoydse4ufhs.edtyo;s8te4arfeliawkfhtsie5tlfia;sefdshroiupeoutwyeli5gurse;ihf'

function md5(str){
  let obj = crypto.createHash('md5');
  obj.update(str);

  return obj.digest('hex');
}

function md5_2(str){
  return md5(md5(str) + _key);
}


//连接到数据库
let db = mysql.createPool({host: 'localhost', port: '3306', user: 'root', pass: '', database: 'testxu'});

let server = http.createServer((req, res) => {
    console.log('接收到一次连接');
    console.log(req.url);
    let { pathname, query } = url.parse(req.url, true);
    let { user, pass } = query;

    switch(pathname){
      //注册：
      case '/reg':
        //校验用户名和密码
        if(!user){
          res.write('{"err": 1, "msg": "username must be exist"}');
          res.end();
        }else if(!pass){
          res.write('{"err": 1, "msg":" password must be exist"}');
          res.end();
        }else if(!/^\w{6,12}$/.test(user)){
          res.write('{"err": 1, "msg": "username is invalid"}');
          res.end();
        }else if(/['|"]/.test(pass)){
          res.write('{"err": 1, "msg": "password is invalid"}');
          res.end();
        }else{
          //首先判断数据库中是否已经存在该用户了
          db.query(`SELECT * FROM user_table WHERE username = '${user}'`, (err, data) => {
            if(err){
              res.write('{"err": 1, "msg": "databaseerror"}');
              res.end();
            }else if(data.length > 0){
              res.wrirte('{"err": 1, "msg": "this username has been existed"}');
              res.end();
            }else{
              db.query(`INSERT INTO user_table (ID, username, password) VALUES(0, '${user}', '${md5_2(pass)}')`, (err, data) => {
                if(err){
                  res.write('{"err": 1, "msg": "database error"}');
                  res.end();
                }else{
                  res.write('{"err": 0, "msg": "success"}');
                  res.end();
                }
              })
            }
          })
        }
        break;
      //登录
      case '/login':
        //校验用户名和密码：
        if(!user){
          res.write('{"err": 1, "msg": "username must be exist"}');
          res.end();
        }else if(!pass){
          res.write('{"err": 1, "msg": "password must be exist"}');
          res.end();
        }else if(!/^\w{6,12}$/.test(user)){
          res.write('{"err": 1, "msg": "username is invalid "}');
          res.end();
        }else if(/['|"]/.test(pass)){
          res.write('{"err": 1, "msg": "password is invalid"}');
          res.end();
        }else{
          db.query(`SELECT * FROM user_table WHERE username='${user}'`, (err, data) => {
            if(err){
              res.write('{"err": 1, "msg": "database error"}');
              res.end();
            }else if(data.length == 0){
              res.write('{"err": 1, "msg": "no this user"}');
              res.end();
            }else{
              res.write('{"error": 0, "msg": "success"}');
              res.end();
            }
          });
        }
        break;
      default:
        //静态文件
        //缓存（可后续补充缓存内容的处理）
        let rs = fs.createReadStream(`www${pathname}`);
        let gz = zlib.createGzip();

        res.setHeader('content-encoding', 'gzip');
        rs.pipe(gz).pipe(res);

        rs.on('error', err => {
          console.log('没有该文件');
          res.writeHeader(404);
          res.write('Not Found');
          res.end();
        });
        break;
    }
})
server.listen(8088);

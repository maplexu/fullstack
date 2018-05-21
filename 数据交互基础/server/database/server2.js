//动手练习

const http = require('http');
const fs = require('fs');
const crypto = require('crypto');
const url = require('url');
const zlib = require('zlib');

const mysql = require('mysql');


let _key = "sadfslekrtuew5iutoselgdtjiypoydse4ufhs.edtyo;s8te4arfeliawkfhtsie5tlfia;sefdshroiupeoutwyeli5gurse;ihf";

//连接到数据库
let db = mysql.createPool({host: 'localhost', port: 3306, user: 'root', password: '', database: 'testxu'});

function md5(str){
  let obj = crypto.createHash('md5');
  obj.update(str);

  return obj.digest('hex');
}

function md5_2(str){
  return md5(md5(str) + _key);
}

let server = http.createServer((req, res) => {
  let { pathname, query } = url.parse(req.url, true);
  let { user, pass } = query;

  //判断请求的类型：数据交互？静态资源请求？
  switch(pathname){
    //注册：
    case '/reg':
      //参数校验
      if(!user){
        res.write('{"err": 1, "msg": "username is required"}');
        res.end();
      }else if(!pass){
        res.write('{"err": 1, "msg": "password is required"}');
        res.end();
      }else if(!/^\w{6,16}$/.test(user)){
        res.write('{"err": 1, "msg": "username is invalid"}');
        res.end();
      }else if(/['|"]/.test(pass)){
        res.write('{"err": 1, "msg": "password is invalid"}');
        res.end();
      }else{
        //首先判断要注册的用户名是否已经在数据库中存在了
        db.query(`SELECT * FROM user_table WHERE username = '${user}'`, (err, data) => {
          if(err){
            res.write('{"err": 1, "msg": "database error"}');
            res.end();
          }else{
            if(data.length > 0){
              res.write('{"err": 1, "msg": "username has been existed"}');
              res.end();
            }else{
              //接着，若数据库中没有该注册名字，就向该数据库中添加该用户名
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
          }
        })
      }
      break;
    //登录：
    case '/login':
      //参数校验：
      if(!user){
        res.write('{"err": 1, "msg": "username is required"}');
        res.end();
      }else if(!pass){
        res.write('{"err": 1, "msg": "password is required"}');
        res.end();
      }else if(!/^\w{6,16}$/.test(user)){
        res.write('{"err": 1, "msg": "username is invalid"}');
        res.end();
      }else if(/['|"]/.test(pass)){
        res.write('{"err": 1, "msg": "password is invalid"}');
        res.end();
      }else{
        //判断要登录的用户在数据库中是否存在：
        db.query(`SELECT * FROM user_table WHERE username = '${user}'`, (err, data) => {
          if(err){
            res.write('{"err": 1, "msg": "database error"}');
            res.end();
          }else{
            if(data.length == 0){
              //用户名和密码都正确
              res.write('{"err": 1, "msg": "no this user"}');
              res.end();
            }else if(data[0].password != md5_2(pass)){
              res.write('{"err": 1, "msg": "username or password is incorrect"}');
              res.end();
            }else{
              res.write('{"err": 0, "msg": "success"}');
              res.end();
            }
          }
        })
      }
      break;
    //其他情况都是对静态资源的请求：
    default:
      //设置缓存
      fs.stat(`www${pathname}`, (err, stat) => {
        if(err){
          res.writeHeader(404);
          res.write('Not Found');
          res.end();
        }else{
          //判断请求头中是否携带有If-Modified-Since字段：
          if(req.headers['if-modified-since']){
            let oDate = new Date(req.headers['if-modified-since']);
            let client_time = Math.floor(oDate.getTime()/1000);
            let server_time = Math.floor(stat.mtime.getTime()/1000);

            if(server_time > client_time){
              sendFileToClient(stat.mtime);
            }else{
              res.writeHeader(304);
              res.write('Not Modified');
              res.end();
            }
          }else{
            sendFileToClient(stat.mtime);
          }
        }
      })
      //封装发送文件内容的操作
      function sendFileToClient(time){
        //创建文件读取流
        let rs = fs.createReadStream(`www${pathname}`);
        //创建压缩流
        let gz = zlib.createGzip();

        //添加Last-modified头
        res.setHeader('Last-Modified', time.toUTCString());
        //添加content-encoding头
        res.setHeader('content-encoding', 'gzip');
        
        rs.pipe(gz).pipe(res);
        rs.on('error', error => {
          res.writeHeader(404);
          res.write('Not Found');
          res.end();
        })
      }

      break;
  }
})

server.listen(8088);

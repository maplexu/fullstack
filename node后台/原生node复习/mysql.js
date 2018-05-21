//操作数据库

const mysql = require('mysql');
const crypto = require('crypto');
const config = require('config');

//创建数据库连接池（这里将配置参数都用一个文件来单独保存，方便处理和使用）
let db = mysql.createPool({
  host: config.db_host,
  port: config.db_port,
  user: config.db_user,
  password: config.db_pass,
  database: config.db_name
})

let md5 = crypto.createHash('md5');

let username = 'blue';
let password = '123456';
md5.update(password + config.md5_key);      //额外提供一个值用于md5加密
password = md5.digest('hex');

//向表中添加数据
db.query(`INSERT INTO user_table (name, password) VALUES('${username}', '${password}')`, (err, rows) => {
  if(err){
    console.log(err);
  }else{
    console.log(rows);
  }
})

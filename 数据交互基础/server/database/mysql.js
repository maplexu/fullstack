const mysql = require('mysql');

//连接到服务器
let db = mysql.createConnection({host: 'localhost', user: 'root', password: '', root: 3306, database: '测试数据库'});
// db.query("INSERT INTO user_table (ID, name, gender, chinese, math, english) VALUES(0, 'node测试', '男', 80, 79, 100)", (err, data) => {
//   if(err){
//     console.log(err);
//   }else{
//     console.log(data);
//   }
// })

db.query("SELECT name from user_table WHERE chinese>120", (err, data) => {
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
})

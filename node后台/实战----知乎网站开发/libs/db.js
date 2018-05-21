const Mysql = require('mysql-pro');
const config = require('../config.js');

let db = new Mysql({
  mysql: {
    host:       config.db_host,
    posrt:      config.db_port,
    pass:       config.db_pass,
    user:       config.db_user,
    database:   config.db_name
  }
})

//因为数据库的操作很频繁，因此这里将数据库事务操作绑定到该db对象上去
db.execute = async sql => {
  await db.startTransaction();

  let res;          //定义一个变量，记录数据库操作的结果

  //判断参数是一条sql语句还是多条
  if(typeof sql == 'string'){
    res = await db.executeTransaction(sql);
  }else{
    sql.forEach(async item=>{
      //注： 这里多条sql语句的操作结果是覆盖的，即无论执行几条，都只返回最后一条语句的结果（符合实际场景）
      res = await db.executeTransaction(sql);
    })
  }
  await db.stopTransaction();

  return res;
}

module.exports = db;

//在koa中操作数据库

const Koa = require('koa');
const router = require('koa-router');
const Mysql = require('mysql-pro');

let server = new Koa();
server.listen(8080);

let r1 = router();
server.use(r1.routes());

const db = new Mysql({
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: '2018/4/16'
  }
})

r1.get('/user', async ctx => {
  await db.startTransaction();
  let data = await db.executeTransaction("SELECT * FROM user_table");
  await db.stopTransaction();

  console.log(data);
  ctx.response.body = data;
})

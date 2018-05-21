//与模板引擎ejs一起使用

const Koa = require('koa');
const pathlib = require('path');
const ejs = require('koa-ejs');

let server = new Koa();
server.listen(8080);

ejs(server, {
  root:   pathlib.resolve('template'),
  layout: false,
  viewExt: 'ejs'
})

server.use(async ctx => {
  await ctx.render('1', {
    name: 'blue',
    age: 18
  })
})

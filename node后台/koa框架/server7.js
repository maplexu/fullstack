//与模板引擎pug一起使用

const Koa = require('koa');
const pathlib = require('path');
const Pug = require('koa-pug');

let server = new Koa();
server.listen(8080);

let pug = new Pug({
  viewPath: pathlib.resolve('template'),
  app:      server
});

server.use(async ctx => {
  await ctx.render('1', {a: 12});
})

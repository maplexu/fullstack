//处理cookie

const Koa = require('koa');

let server = new Koa();
server.listen(8080);

server.use(async ctx => {
  console.log(ctx.cookies.get('a'));
  ctx.cookies.set('b', 10, {
    maxAge: 86400*1000
  });

  ctx.response.body = 'aaa';
})

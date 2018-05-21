//路由参数的基本使用
const Koa = require('koa');
const router = require('koa-router');
const pathlib = require('path');

let server = new Koa();
server.listen(8080);

let r1 = router();
server.use(r1.routes());

r1.get('/api/:name/:arg', async (ctx, next) => {        //注意：请求的时候路由参数数目要和这里一样多
  console.log(ctx.params);
  ctx.response.body = 'aaa';
})

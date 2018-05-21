//处理普通的连接

const koa = require('koa');
const router = require('koa-router');

let server = new koa();
server.listen(8080);

let r1=router();
server.use(r1.routes());

r1.get('/aaa', async (ctx, next) => {
  //ctx.req
  //ctx.request

  //ctx.res
  //ctx.response

  console.log(ctx.request.header);
  console.log(ctx.request.headers);

  ctx.response.body = '页面不存在';
  ctx.response.status = 403;
})

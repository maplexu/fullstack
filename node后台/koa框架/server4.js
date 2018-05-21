//处理post请求
const Koa = require('koa');
const betterBody = require('koa-better-body');
const convert = require('koa-convert');
const pathlib = require('path');

let server = new Koa();
server.listen(8080);

server.use(convert(betterBody({
  uploadDir: pathlib.resolve('./upload')
})));

server.use(async ctx => {
  console.log(ctx.request.fields);
  console.log(ctx.request.files);
  ctx.response.body="ok111";
})

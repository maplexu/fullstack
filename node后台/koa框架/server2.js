//处理静态文件请请求
const Koa = require('koa');
const staticCache = require('koa-static-cache');
const pathlib = require('path');

let server = new Koa();
server.listen(8080);

server.use(staticCache(pathlib.resolve('www')));

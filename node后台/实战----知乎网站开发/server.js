const pathlib = require('path');

const Koa = require('koa');
const staticCache = require('koa-static-cache');
const body = require('koa-better-body');
const convert = require('koa-convert');
const session = require('koa-session');
const Router = require('koa-router');
const Mysql = require('mysql-pro');
const ejs = require('koa-ejs');

const error = require('./libs/error_handle');
const loglib = require('./libs/log.js')

//引入配置：
const config = require('./config.js');





//====一.创建服务器====
let server = new Koa();
server.listen(config.port);

//====二.连接数据库（单独封装）：====
let db = require('./libs/db.js');

//====三.添加中间件====
//1.添加错误处理（单独封装该中间件）：
error(server);
//2.和日志处理（安度封装该中间件）：
loglib(server);
//补充：这里通过中间件将db绑定到ctx上，模拟实现全局变量的效果（否则每次操作数据库都要重新连接一次）
server.use(async (ctx, next) => {
  ctx.db = db;
  await next();
})


//2.添加对post请求的中间件处理(需要用convert来转换body中间件的写法)：
server.use(convert(body({
  uploadDir: config.uploadDir
})));

//3.添加对session的中间件处理：
server.keys = config.secret_key;
server.use(session({}, server));

//4.添加对ejs的中间件使用：
ejs(server, {
  root:     pathlib.resolve('template'),
  layout:   false,
  viewExt:  '.ejs.html',  //该扩展名既方便调试时知道这是一个模板文件，又能直接打开
  cache:    false,        //是否缓存
  debug:    false
})
//5.添加请求处理静态资源的中间件处理：
server.use(staticCache(config.wwwDir));

//====四.路由====
//在主文件中创建一个主路由，后续的子路由都绑定到该主路由上
let mainRouter = new Router();
mainRouter.use('/', require('./routers/index'));

server.use(mainRouter.routes());

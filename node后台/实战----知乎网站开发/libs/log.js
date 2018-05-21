const config = require('../config.js')
const fs  = require('fs');

module.exports = server => {
  server.use(async (ctx, next) => {
    //注意，目前node里面的appendFile不支持async/await，因此不能直接在它的
    await new Promise((resolve, reject) => {
      fs.appendFile(config.logpath, `[${Date.now()}] ${ctx.method} ${ctx.url}\r\n`, err => {
        //appendFile方法只有一个回调，是否出错了直接就在这个回调函数中进行判断
        if(err){
          reject();
        }
        resolve();
      });
    });
    await next();
  })
}

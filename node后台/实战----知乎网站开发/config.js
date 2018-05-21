/*
    该文件内存放一些通用的可配置项，其他文件（模块）红有需要使用这些配置项的都从这里引入
    方便统一维护
*/
const pathlib = require('path');

module.exports = {
    //basic(基本的一些配置)
    port:       8080,                               //服务器监听的端口
    uploadDir:  pathlib.resolve('www/upload'),      //文件上传的保存路径
    wwwDir:     pathlib.resolve('www'),             //存放静态资源的路径
    logpath:    pathlib.resolve('log/access.log'),     //存放日志文件的路径

    //secret(安全相关的配置)
    secret_key: ['asdsadasdasdsa', 'ashfauiiasdjaskd', 'jxczxcsasasd'],   //session签名所需的滚动密钥

    //database（数据库相关的配置）
    db_host:    'localhost',
    db_port:    3306,
    db_user:    'root',
    db_pass:    '',
    db_name:    'zhihu'
}

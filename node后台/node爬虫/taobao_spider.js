//示例----抓取淘宝页面（存在重定向的情况）
//根据响应状态码分析重定向的情况

const http = require('http');
const https = require('https');
const pathlib = require('path');
const fs = require('fs');


let req =  http.request({
  host: 'www.taobao.com',
  path: '/',
  headers: {}
}, res => {
  if((res.statusCode>=200 && res.statusCode < 300) || res.statusCode == 200){
    //请求成功：
    let arr = [];
    res.on('data', data=>{
      arr.push(data);
    })
    res.on('end', ()=>{
      let buffer = Buffer.concat(arr);
      fs.writeFile(pathlib.resolve('tmp', 'taobao.html'), buffer, err => {
        if(err){
          console.log('文件写入失败', err);
        }else{
          console.log('完成');
        }
      });
    });
  }else if(res.statusCode == 301 || res.statusCode == 302){
    //请求重定向：
    console.log(res.statusCode);
    console.log(res.headers);
  }else{
    //请求失败
    console.log('错了', res.statusCode);
  }
});

req.on('error', err => {
  console.log(err);
})
req.write('');
req.end();

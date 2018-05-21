//示例----抓也百度页面

const http = require('http');
const https = require('https');
const fs = require('fs');
const pathlib = require('path');

let req = http.request('http://www.baidu.com', res => {
  //根据响应的状态码判断请求是否成功：
  if((res.statusCode >=200 && res.statusCode < 300) || res.statusCode == 304){
    //手机post请求返回的结果
    let arr = [];
    res.on('data', data => {
      arr.push(data);
    });
    res.on('end', () => {
      let buffer = Buffer.concat(arr);

      //将请求到的baidu的页面内容保存到文件中去
      fs.writeFile(pathlib.resolve('tmp', 'baidu.html'), buffer, err=>{
        if(err){
          console.log('文件写入失败', err);
        }else{
          console.log('完成');
        }
      })
    })
  }else{
    console.log('错了', res.statucCode);
  }
})

req.on('error', err => {
  console.log(err)
})
req.write('');
req.end();

//封装的抓取（请求）资源操作


const http = require('http');
const https = require('https');
const urllib = require('url');
const pathlib = require('path');
const fs = require('fs');


function requestUrl(url, headers){
  let urlObj = urllib.parse(url);
  let httpMod = null;

  //1.根据请求的地址判断要采用的协议
  if(urlObj.protocol == 'http:'){
    httpMod = http;
  }else if(urlObj.protocol == 'https:'){
    httpMod = https;
  }else{
    throw new Error('错误的协议：' + urlObj.protocol);
  }

  //2.发起一个请求：
  return new Promise((resolve, reject) => {
    let req = httpMod.request({
      host: urlObj.host,
      path: urlObj.path,
      headers
    }, res => {
      //请求成功
      if((res.statusCode >= 200 && res.statusCode < 300) || res.statusCode == 304){
        let arr = [];
        res.on('data', data => {
          arr.push(data);
        })
        res.on('end', () => {
          let buffer = Buffer.concat(arr);

          resolve({
            status: 200,
            body:   buffer,
            headers:res.headers
          })
        })
      }else if(res.statusCode == 301 || res.statusCode == 302){
        resolve({
          status: res.statusCode,
          body:   null,
          headers:res.headers
        })
      }else{
        reject({
          status: res.statusCode,
          body:   null,
          headers:res.headers
        });
      }
    });

    req.on('error', err => {
      console.log('请求失败', err);
    })
    req.write('');
    req.end();
  })
}

module.exports = async (url, reqHeaders) => {
  try {
    while(1){
      let {status, body, headers} = await requestUrl(url, reqHeaders);
      if(status == 200){
        //请求成功的情况：
        return {status, body, headers};
      }else{
        //请求重定向的情况：
        url = headers.location;
      }
    }
  } catch (e) {
    console.log('出错', e);
  }
}

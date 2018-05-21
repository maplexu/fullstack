//处理（一次）重定向的情况：

const http = require('http');
const https = require('https');
const fs = require('fs');
const urllib = require('url');

function requestUrl(url, headers){
  let urlObj = urllib.parse(url);
  let httpMod = null;

  if(urlObj.protocol == 'http:'){
    httpMod = http;
  }else if(urlObj.protocol == 'https:'){
    httpMod = https;
  }else{
    throw new Error(`协议无法识别：${urlObj.protocol}`)
  }
  return new Promise((resolve, reject) => {
    let req = httpMod.request({
      host: urlObj.host,
      path: urlObj.path,
      headers
    }, res => {
      if((res.statusCode >= 200 && res.statusCode < 300) || res.statusCode == 304){
        let arr = [];
        res.on('data', data => {
          arr.push(data);
        });
        res.on('end', ()=>{
          let buffer = Buffer.concat(arr);

          resolve({
            status: 200,
            body:   buffer,
            headers: res.headers
          });
        })
      }else if(res.statusCode == 301 || res.statusCode == 302){
        resolve({
          status: res.statusCode,
          body:   null,
          headers:res.headers
        });
      }else{
        reject({
          status: res.statusCode,
          body:   null,
          headers:res.headers
        })
      }
    });
    req.on('error', err => {
      console.log('请求出错', err);
    })
    req.write('');
    req.end();
  })
}

async function request(url, reqHeaders){
  try{
    let {status, body, headers} = await requestUrl(url, reqHeaders);
    console.log(status);
    if(status == 200){
      //请求成功的情况：
      console.log('直接请求成功');
    }else{
      //请求重定向的情况：
      let {status, body, headers: headers2} = await requestUrl(headers.location, reqHeaders);
      console.log(status);
      fs.writeFile('tmp/taobao.html', body, err => {});
    }
  }catch(e){
    console.log('错误', e);
  }
}

request('http://www.taobao.com');

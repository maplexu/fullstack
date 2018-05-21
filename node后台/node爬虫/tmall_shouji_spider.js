//抓取天猫电器城页面的代码

const request = require('./libs/request');
const fs = require('fs');

(async () => {
  try {
    let { body, headers } = await request('https://shouji.tmall.com/');
    fs.writeFile('tmp/tmall_shouji.html', body, err => {
      if(err){
        console.log('页面内容保存失败');
      }else{
        console.log('页面内容保存成功');
      }
    })
  } catch (e) {
    console.log(e);
  }
})()

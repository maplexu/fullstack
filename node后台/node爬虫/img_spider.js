const request = require('./libs/request.js');
const fs = require('fs');

(async () => {
  try {
      let {body, headers} = await request('https://www.baidu.com/img/bd_logo1.png?where=super');
      fs.writeFile(`tmp/logo.png`, body, err => {
        if(err){
          console.log(err);
        }else{
          console.log('图片保存成功');
        }
      })
  } catch (e) {
    console.log(e);
  }
})()

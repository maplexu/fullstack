let fs = require('fs');

fs.readFile('1.txt', (err, data) => {
  if(err){
    console.log('读取文件时出错');
  }else{
    console.log(data);
  }
})

// fs.writeFile('1.txt', 'asdaasdsfasfasdas', err => {
//   if(err){
//     console.log('写入文件时出错');
//   }else{
//     console.log('文件写入成功');
//   }
// })

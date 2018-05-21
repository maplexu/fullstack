const http = require('http');
const fs = require('fs');
const uuid = require('uuid');
const common = require('./libs/common');

let server = http.createServer((req, res) => {
  let arr = [];       //容器数组，存放请求接收到的二进制数据包

  req.on('data', data => {
    arr.push(data);     //这里将接收到的二进制数据，用一个数组存放起来
  });
  req.on('end', () => {
    let data = Buffer.concat(arr);      //获取请求的数据（二进制buffer）


    //这里定义两个容器：
    let post = {};   //存放普通数据的容器（保存普通数据名--数据值）
    let files = {}; //存放文件数据的容器（保存文件名--文件存储位置）

    //解析文件上传的数据
    //首先要从请求头中获取到分隔符
    if(req.headers['content-type']){
      let str = req.headers['content-type'].split('; ')[1];

      if(str){
        let boundary = '--' + str.split('=')[1];      //注意，这里需要给分割符加上两个--，因为实际数据中多了两个
        //1.使用分隔符切分整个数据
        let arr = data.split(boundary);
        //2.丢弃头尾两个数据
        arr.shift();
        arr.pop();

        //3.丢弃数组中每一项头尾的\r\n
        arr = arr.map(buffer => buffer.slice(2, buffer.length-2));

        //4.对数组中的每一项在第一个\r\n\r\n处切成两半
        arr.forEach(buffer => {
          let n = buffer.indexOf('\r\n\r\n');

          let disposition = buffer.slice(0, n);     //得到数据描述
          let content = buffer.slice(n+4);          //得到数据值

          disposition = disposition.toString();

          if(disposition.indexOf('\r\n') == -1){
            //当前项是----普通数据，当前项的数据描述的基本格式为：Content-Disposition: form-data; name="user"
            content = content.toString();     //对于普通数据，内容可直接转换成字符串

            let name = disposition.split('; ')[1].split('=')[1];   //从数据描述中获取该数据的名称
            name = name.substring(1, name.length-1);        //去除引号

            post[name] = content;                           //将数据保存到容器中
          }else{
            //当前项是----文件数据，当前项的数据描述的基本格式为：Content-Disposition: form-data; name="f1"; filename="a.txt"\r\nContent-Type: text/plain
            let [line1, line2] = disposition.split('\r\n');
            let [, name, filename] = line1.split('; ');
            let type = line2.split(': ')[1];

            //获取该文件的请求参数名
            name = name.split('=')[1];
            name = name.substring(1, name.length - 1);

            //获取该文件的文件名
            filename = filename.split('=')[1];
            filename = filename.substring(1, filename.length - 1);

            let path = `upload/${uuid().replace(/\-/g, '')}`;     //使用uuid生成一个文件存储的随机名称

            fs.writeFile(path, content, err => {
              if(err){
                console.log('文件写入失败', err);
              }else{
                files[name] = { filename, path, type };
                console.log(files);
              }
            });
          }
        });
        //5.完成
      }
    }
    res.end();
  })
})

server.listen(8080);

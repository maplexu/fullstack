const http = require('http');
const fs = require('fs');
const uuid = require('uuid');
const common = require('./libs/common');


let server = http.createServer((req, res) => {
  let arr = [];

  req.on('data', data => {
      arr.push(data);
  })

  req.on('end', () => {
    //获取请求数据（二进制buffer数据）
    let data = Buffer.concat(arr);

    //定义两个容器盒子
    let post = {};      //存放普通文件信息
    let files = {};     //存放文件数据信息

    //从请求头中获取分隔符
    if(req.headers['content-type']){
      let str = req.headers['content-type'].split('; ')[1];
      if(str){
        let boundary = '--' + str.split('=')[1];

        //1.用分隔符切开二进制数据，获得二进制数据组成的数组
        let arr = data.split(boundary);

        //2.丢弃数组中的头尾元素
        arr.shift();
        arr.pop();

        //3.丢弃数组中每一项㢝头尾的\r\n
        arr = arr.map(buffer => buffer.slice(2, buffer.length-2));

        //4.对数组中的每一项，使用第一次出现的\r\n\r\n进行切分
        arr.forEach(buffer => {
          let n = buffer.indexOf('\r\n\r\n');
          let disposition = buffer.slice(0, n);     //每一项数据的描述部分
          let content = buffer.slice(n + 4);        //每一项数据的内容部分

          disposition = disposition.toString();     //文件描述(描述都是普通文件，因此可先转换成字符串形式)
          //5.判断数据描述中是否有\r\n，有的话就是文件数据，没有的话就是普通数据
          if(disposition.indexOf('\r\n') == -1){
            //普通数据，其数据描述的基本格式为： Content-Disposition: form-data; name="user"
            content = content.toString();                     //数据值（普通数据可直接转成字符串了）
            let name = disposition.split('; ')[1];            //数据名称
            name = name.split('=')[1].slice(1, name.length-1);

            //存储普通数据：
            post[name] = content;
          }else{
            //文件数据，其数据描述的基本格式为： Content-Disposition: form-data; name="f1"; filename="xxx.txt"/r/nContent-Type: text.plain
            let [line1 ,line2] = disposition.split('\r\n');   //line1为文件数据描述部分；line2为文件内容部分
            let [, name, filename] = line1.split('; ');
            let type = line2.split('; ')[1];

            name = name.split('=')[1].slice(1, name.length - 1);          //获取文件的参数名
            filename = filename.split('=').slice(1, name.length - 1);     //获取上传的文件名

            let path =  `upload/${uuid().replace(/\-/g, '')}`;            //定义文件的存储路径和存储名
            fs.writeFile(path, content, err => {
              if(err){
                console.log('文件写入失败', err);
              }else{
                files[name] = { filename, path, type }            //存储文件数据信息（文件名，文件的存储地址，文件类型）
                console.log('files', '||', files);
              }
            })
          }
        });

        console.log('post', '||', post);

      }
    }
    res.end();
  })
})

server.listen(8080);

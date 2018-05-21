const express = require('express');
const body = require('body-parser');
const multer = require('multer');

let db = mysql.createPool({host: 'localhost', port: 3309, user: 'root', password: '', database: '20180208'});
let server = express();
server.listen(8080);

//使用body中间件
server.use(body.urlencoded({extended: false}));

//使用multer中间件：
let multerObj = multer({dest: './upload/'});
server.use(multerObj.any());


//处理请求：
server.use('/api', (req, res) => {
  if(req.headers['origin'] == 'null' || req.headers['origin'] == 'http://localhost/'){
    res.setHeader('Access-Control-Allow-Origin', '*');
  }


  //console.log(req.body);
  //console.log(req.files);

  let arr = [];
  req.files.forEach(file => {
    arr.push(`('${file.originalname}', '${file.filename}', '${Math.floor(Date.now()/1000)}')`);
  })

  let sql = `INSERT INTO image_table (originalname, filename, time) VALUES${arr.join(',')}`;

  db.query(sql, (err) => {
    if(err){
      res.send('不OK');
    }else{
      res.send('OK');
    }
  });
});

//使用处理静态文件请求的中间件
server.use(express.static('./www'));

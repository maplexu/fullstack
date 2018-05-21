const express = require('express');
const fs = require('fs');
const pathlib = require('path');

const datas = JSON.parse(fs.readFileSync(pathlib.resolve('.exported')));

let server = express();
server.listen(8090);

console.log('server is running in 8090');

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

//请求文章（翻页）
server.get('/list', (req, res) => {
  let page = parseInt(req.query['page']||0);
  let page_size = 8;

  let arr = datas.slice(page*page_size, (page+1)*page_size).map(item => {
    return {
      id:       item.article['detailArticle|post'].id,
      tag:      item.tag,
      title:    item.title,
      src:      item.src,
      summary:  item.summary,
      time:     Math.floor(new Date(item.time).getTime()/1000),
      catalogs: item.catalogs,
      author:   {
        title:  item.author_title,
        href:   item.author_href
      }
    };
  });

  res.send(arr);
});

//请求图片
server.get('/img', (req, res) => {
  let src = req.query.src;
  res.sendFile(pathlib.resolve('img', src));
})

//获取文章详情
server.get('/detail', (req, res) => {
  let id = req.query.id;
  let data = null;

  datas.forEach(item => {
    if(item.article['detailArticle|post'].id == id){
      data = item;
    }
  });

  res.send(data);
})

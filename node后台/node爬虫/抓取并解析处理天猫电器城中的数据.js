//本案例主要包含三部分工作：
//  1. 抓取页面源码
//  2. 解析源码，获取我们需要的数据
//  3. 处理数据（保存进数据库）

const request = require('./libs/request');
const fs = require('fs');
const JSDOM = require('jsdom').JSDOM;
const gbk = require('gbk');         //用于处理网页是gbk编码的问题
const Mysql = require('mysql-pro');


let db = new Mysql({
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'tmall_shouji'
  }
})
//封装的数据库事务操作的方法：
async function query(sql){
  await db.startTransaction();
  let data = await db.executeTransaction(sql);
  await db.stopTransaction();

  return data;
}
//封装的通过jddom获取dom对象的方法：
function html2$(html){
  let document = new JSDOM(html).window.document;
  return document.querySelectorAll.bind(document);
}


// 一.数据抓取：
async function indexSpider(){
  try {
    let {body, headers} = await request('http://shouji.tmall.com/');
    let datas = indexParser(body);

    await indexProcessor(datas);

  } catch (e) {
    conselog.log('请求失败');
    console.log(e);
  }
}


// 二.数据解析：
function indexParser(buffer){
  //使用两次html2$来获取，第一次是获取页面中的textarea.f1元素对应的DOM对象，第二次是获取textarea.f1元素下面的html对应的DOM对象
  let $ = html2$(html2$(buffer.toString())('textarea.f1')[0].value);
  return Array.from($('li')).map(li => {
    let oA = li.getElementsByClassName('mod-g-photo')[0];

    return {
      url:          'https:'+oA.href,
      img_src:      'https:'+oA.children[0].getAttribute('data-lazyload-src'),
      name:         li.getElementsByClassName('mod-g-tit')[0].children[0].innerHTML,
      descrption:   li.getElementsByClassName('mod-g-desc')[0].innerHTML,
      price:        li.getElementsByClassName('mod-g-nprice')[0].innerHTML.match(/\d+(\.\d+)?/g)[0],
      sales:        li.getElementsByClassName('mod-g-sales')[0].innerHTML.match(/\d+/g)[0]
    };
  })
}

// 三.处理数据：
async function indexProcessor(datas){
  //1.将解析得到的数据存入数据库
  for(let i = 0; i < datas.length; i++ ){
    let rows = await query(`SELECT * FROM item_table WHERE url=${datas[i].url}`);
    //先判断数据库中是否存在该项数据，不存在就添加，存在的话就修改
    if(rows.length>0){
      await query(`UPDATE item_table SET url='${datas[i].url}', img_src='${datas[i].img_src}', name='${datas[i].name}',descrption='${datas[i].descrption}',price='${datas[i].price}',sales='${datas[i].sales}' WHERE ID=${rows[0].ID}`);
    }else{
      await query(`INSERT INTO item_table (ID, url, img_src, name, descrption, price, sales) VALUES(0, '${datas[i].url}', '${datas[i].img_src}', '${datas[i].name}', '${datas[i].descrption}', '${datas[i].price}', '${datas[i].sales}')`);
    }
  }
}


// 三-1.继续向下抓取详情数据：
async function detailSpider(url){
  try {
    let {body, headers} = await request(url);
    let datas = detailParser(body);

    detailProcessor(data);
  } catch (e) {

  }
}
// 三-2.解析详情数据：
function detailParser(body){
  let $ = html2$(gbk.toString('utf-8', body));

  let attributes = {};

  Array.from($('.attributes-list li')).forEach(li => {
    let n = li.innerHTML.seatch(/: |:/);
    if(n == -1)return;
    let key = li.innerHTML.substring(0, n);
    let val = li.innerHTML.substring(n+1);
    attributes[key] = val;
  })
  return attribute;
}

// 三-3.对详情数据进行处理：
async function detailProcess(datas){

}

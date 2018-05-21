//jsdom处理抓取天猫电器城数据

const JSDOM = require('jsdom').JSDOM;
const fs = require('fs');

//封装的通过jsdom获取dom对象的方法
function html2$(html){
  let document = new JSDOM(html).window.document;
  return document.querySelectorAll.bind(document);
}

fs.readFile('tmp/tmall_shouji.html', (err, buffer) => {
  if(err){
    console.log('读取失败');
  }else{
    //这里调用两次html2$方法，是因为tmall_shou.html下的textarea.f1文本域下存放的也是一串html代码
    //这里就要对这里面的html代码来解析
    let $ = html2$(html2$(buffer.toString())('textarea.f1')[0].value);
    let datas = Array.from($('li')).map(li => {


      let oA = li.getElementsByClassName('mod-g-photo')[0];

      return {
        url:          'https:' + oA.href,
        img_src:      'https:' + oA.children[0].getAttribute('data-lazyload-src'),
        name:         li.getElementsByClassName('mod-g-tit')[0].children[0].innerHTML,
        description:  li.getElementsByClassName('mod-g-desc')[0].innerHTML,
        price:        li.getElementsByClassName('mod-g-nprice')[0].innerHTML.match(/\d+(\.\d+)?/g)[0],
        sales:        li.getElementsByClassName('mod-g-nprice')[0].innerHTML.match(/\d+/g)[0]
      }
    })
    console.log(JSON.stringify(datas));
  }
})

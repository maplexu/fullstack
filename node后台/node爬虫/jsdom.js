//jsdom的基本用法

const JSDOM = require('jsdom').JSDOM;
const fs = require('fs');

fs.readFile('test.html', (err, buffer) => {
  if(err){
    console.log(err);
  }else{
    let html = buffer.toString();


    let jsdom = new JSDOM(html);
    let document = jsdom.window.document;
    let $ = document.querySelectorAll.bind(document);

    let oTxt = $('input.txt1')[0];

    console.log(oTxt.value);
  }
})

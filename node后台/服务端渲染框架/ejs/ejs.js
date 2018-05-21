const ejs = require('ejs');

ejs.readerFile('./template/ejs/3.html', {
  a: 12, b: 5,
  str: '我叫<strong>blue</strong>',
  arr: [12, 5, 8, 7],
  header_path: 'component/vip_header.html'
}).then(data => {
  console.log(data);
}, err => {
  console.log('渲染错误');
  console.log(err);
})

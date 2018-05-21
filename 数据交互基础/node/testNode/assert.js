let assert = require('assert');

function sum(a, b){
  assert(arguments.length == 2, '必须传入两个参数');
  assert(typeof a == 'number', '参数a必须是数字');
  assert(typeof b == 'number', '参数b必须是数字');

  console.log(a+b);
}

sum(1,'a');

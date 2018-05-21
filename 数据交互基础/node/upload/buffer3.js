Buffer.prototype.split = Buffer.prototype.split || function(str){
  var arr = [];

  let cur = 0;      //记录当前分割的位置（初始为0）
  let n = 0;
  while((n=this.indexOf(str, cur))!=-1){
    arr.push(this.slice(cur, n));
    cur = n + str.length;
  }

  arr.push(this.slice(cur));      //将最后一段添加进数组中

  return arr;
}
let b=new Buffer('abccc-=-dddder-=-qwerqwer');
let arr = b.split('-=-');

console.log(b);
console.log(arr);
console.log(arr.map(buffer => buffer.toString()));

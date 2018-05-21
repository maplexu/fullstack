Buffer.prototype.split = Buffer.prototype.split || function(str){
  let arr = [];

  let cur = 0;      //定义当前要开始截取的位置
  let n = 0;        //定义目前已经截取到的内容的位置
  while((n = this.indexOf(str, cur)) != -1){
    arr.push(this.slice(cur, n));
    cur = n + str.length;
  }

  arr.push(this.slice(cur));        //添加最后一段数据

  return arr;
}

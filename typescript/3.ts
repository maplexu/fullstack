//指定数组类型

//数字数组
let a:number[] = [1,2,3,4];

//联合类型数组
let b:(string|number)[] = [1, 2, 3, 'ab'];

//元祖类型：
let c:[number, boolean] = [12, true];
c.push(20);

console.log(b);

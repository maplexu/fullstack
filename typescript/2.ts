//1.给变量指定类型：
let a:number=12;
let b:boolean=true;
let c:string='asasdasd';
let d:any;

//2.给函数的参数指定类型：
function show(a:number, b:number){
  return a + b;
}

//3.给函数的返回值指定类型：
function show2(a:number, b:number):number{
  return a + b;
}

console.log(show(12, 5));

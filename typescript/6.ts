//给函数添加never类型，表示该函数永远不会结束：

function show():never{
  let a=12;
  let b=5;
  console.log(a+b);
  throw new Error();
}

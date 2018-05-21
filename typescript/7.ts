//ts的编译器在编译时还是具有一定的预知性能力的，借此来判断类型：

let a:undefined = (() => {
  return undefined;
})();

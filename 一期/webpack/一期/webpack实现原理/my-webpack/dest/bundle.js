
      mod1 = (function(){
        const module = {};
        module.exports = {};

        //模块原来的内容：
        let n1 = 5;
let n2 = 33;

module.exports= {
  a: n1 + n2
}


        return module.exports;
      })()
      ;
var mod2 = (function(){
        const module = {};
        module.exports = {};

        //模块原来的内容：
        function show(a){
  return a + 5 - 13;
}

module.exports = {
  b: show(8)
}

exports.c = 99;
;

        return module.exports;
      })();


console.log(mod1.a + mod2.b);

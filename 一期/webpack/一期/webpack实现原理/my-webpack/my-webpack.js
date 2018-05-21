const pathlib = require('path');
const process = require('process');
const fs = require('fs');

//定义获取的配置文件信息：
let config = null;

function cwd(filename){
  return pathlib.resolve(process.cwd(), filename);
}

//1.先判断配置文件是否存在
try{
  config = require(cwd('my-webpack.config.js'));
}catch(e){
  console.log('找不到my-webpack.config.js文件');
}

//若配置文件不存在的话就直接退出程序
if(!config){
  console.log('配置文件为空');
  return;
}

//2.检查配置文件中的配置项：
if(!config.entry){
  console.log('配置文件缺少entry');
  return;
}

if(!config.output){
  console.log('配置文件缺少output');
  return;
}

//3.根据entry入口文件开始对引入的模块进行解析
for(let name in config.entry){
  //入口文件名
  let filename = config.entry[name];

  //检查入口文件是否存在：
  try{
    //获取入口文件中的内容：
    let buffer = fs.readFileSync(cwd(filename));
    let str = buffer.toString();

    let result;     //对入口文件内容编译后的结果
    //开始对入口文件中的内容进行解析编译：
    //解析编译 require 语句
    result = str.replace(/require\([^\(\)]+\)/g, function(str){

      str = str.replace(/^require/, '');
      let path = eval(str);

      let content = '';   //记录引入的模块的内容

      //下面分别对.js，.json和不带后缀的文件进行文件内容读取操作：
      try{
        content = fs.readFileSync(cwd(path) + '.js').toString();
      }catch(e){
        try{
          content = fs.readFileSync(cwd(path) + '.json').toString();
        }catch(e){
          try{
            content = fs.readFileSync(cwd(path)).toString();
          }catch(e){
            console.log(`找不到${path}`);
          }
        }
      }

      //返回替换编译后的结果：
      return `(function(){
        const module = {};
        module.exports = {};

        //模块原来的内容：
        ${content};

        return module.exports;
      })()`;
    })
    //解析编译 import 语句
    result = result.replace(/import mod1 from [\'\"\`]?[^\'\"\`]+[\'\"\`]?/, function(str){
      let arr = str.split(/\s+/g);
      let var_name = arr[1];
      let path = eval(arr[3]);

      let content = '';
      try{
        content = fs.readFileSync(cwd(path) + '.js').toString();
      }catch(e){
        try{
          content = fs.readFileSync(cwd(path) + '.json').toString();
        }catch(e){
          try{
            content = fs.readFileSync(cwd(path)).toString();
          }catch(e){
            console.log(`找不到${path}`);
          }
        }
      }

      //返回替换编译后的结果：
      return `
      ${var_name} = (function(){
        const module = {};
        module.exports = {};

        //模块原来的内容：
        ${content}

        return module.exports;
      })()
      `
    });

    //将编译后得到的结果输出到配置文件指定的输出路径下去：
    let json = pathlib.parse(config.output.filename);
    try{
      fs.mkdir(json.dir);
    }catch(e){}
    fs.writeFileSync(cwd(config.output.filename), result);
    console.log('编译成功');
  }catch(e){
    console.log(`找不到入口文件：${filename}`)
  }
}

//封装的一个加载资源的方法：
  //先从一个json资源描述文件中获取图片的路径和帧格式（宽高，位置）
  //然后记录保存该资源描述文件中对应的所有的帧图片数据
function loadResource(path){
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'img/' + path,
      dataType: 'text',
      success(txt){
        let json = eval('('+txt+')');

        //console.log(json);

        //定义一个res对象，存放该资源描述文件中描述的所有图片数据(按如下格式)
        let res = {};
        let count = 0, total = 0;
        for(let name in json){
          total++;
          let oImg = new Image();
          oImg.src = 'img/' + json[name].src;
          oImg.onload = function(){
            res[name] = {
              img: this,                       // 图片对象
              frame: json[name].frame          // 图片帧的数据（图片帧的宽，高，以及该图片帧在原图中的坐标）
            }
            count++;
            //这里用count和total这两个变量来判断图片是否全部加载完了
            if(count == total){
              resolve(res);
            }
          };
          oImg.onerror = function(){
            reject();
          }
        }
      },
      error(err){
        reject(err);
      }
    })
  })
}


//封装的获取所有资源图片的方法：
async function loadResources(){
  //定义一个src，存放有所有资源描述文件的资源名
  let src = {
    bottom: 'bottom.json',
    bullet: 'bullet.json',
    cannon: 'cannon.json',
    coin: 'coin.json',
    fish: 'fish.json',
    number: 'number.json',
    web: 'web.json'
  };

  //定于一个imgs对象，存放所有资源描述文件对应的图片数据
  let imgs = {};

  try{
    for(let name in src){
      imgs[name] = await loadResource(src[name]);
    }
    console.log(imgs);
    //将处理得到的图片数据保存为一个全局变量
    window.__g_resource = imgs;
  }catch(e){
    throw e;
  }
}

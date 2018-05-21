//定义一个画炮的类，需要一个type参数：
    //type: 炮的类别（直接传入一个数字，自己去拼接炮的图片名）

class Cannon extends Spirit{
  constructor(type){
    if(type > 5 || type < 1){
      throw new Error('炮的类型只能在1-5之间');
    }

    const data = __g_resource['cannon'][`cannon${type}`];
    super({
      img: data.img,
      sx:   data.frame.x,
      sy:   data.frame.y,
      w:    data.frame.w,
      h:    data.frame.h
    });

    this.type = type;       //记录炮的大小！！！！
    this.max_tick = 5;
    this.max_frame = 5;
  }
  //切换炮的阿小
  setType(newType){
    if(newType < 1 || newType > 7){
      throw new Error('炮的类型不对，只能是1-7之间');
    }
    let data = __g_resource['cannon'][`cannon${newType}`];
    this.img = data.img;
    this.sx = data.frame.x;
    this.sy = data.frame.y;
    this.w = data.frame.w;
    this.h = data.frame.h;

    this.type = newType;
  }
}

//定义一个画硬币的类，传入一个type参数：
    ////type: 硬币的类别（直接传入一个数字，自己去拼接炮弹的图片名）
class Coin extends Spirit{
  constructor(type){
    if(type > 2 || type < 1){
      throw new Error('硬币的类型只能在1-2之间');
    }

    const data  = __g_resource['coin'][`coinAni${type}`];

    super({
      img: data.img,
      sx: data.frame.x,
      sy: data.frame.y,
      w: data.frame.w,
      h: data.frame.h,
      speed: 5
    });
    this.type = type;
    
    this.max_tick = 2;
    this.max_frame = 10;
  }
}

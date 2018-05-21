//定义一个画炮弹的类，传入一个type参数：
    ////type: 炮弹的类别（直接传入一个数字，自己去拼接炮弹的图片名）

class Bullet extends Spirit{
  constructor(type){
    if(type > 7 || type < 1){
      throw new Error('炮弹类别只能在1-7之间');
    }

    const data = __g_resource['bullet'][`bullet${type}`]
    super({
      img: data.img,
      sx: data.frame.x,
      sy: data.frame.y,
      w: data.frame.w,
      h: data.frame.h
    });

    this.type = type;

    this.speed = 10;
  }
}

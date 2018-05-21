//定义一个画鱼的类，需要一个type参数：
    //type: 鱼的类别（直接传入一个数字，自己去拼接鱼的图片名）

class Fish extends Spirit {
  constructor(type){
    if(type > 5 || type < 1){
      throw new Error('鱼的类型只能在1-5之间');
    }

    const data = __g_resource['fish'][`fish${type}`];

    //调用父类的属性
    super({
      img: data.img,
      sx: data.frame.x, sy: data.frame.y,
      w: data.frame.w, h: data.frame.h,
      rotation: 90,
      speed: Math.random()*2.5 + 0.5
    });

    this.type = type;

    //定义鱼（动画帧）动画快慢
    this.max_tick = 5;
    //记录鱼图片最大的帧数
    this.max_frame = 4;

  }
  //因为鱼图片和炮弹图片的初始角度不一样，因此这里重写draw方法，在绘制鱼时都先减90度
  draw(gd){
    this.rotation -= 90;
    super.draw(gd);
    this.rotation += 90;
  }
}

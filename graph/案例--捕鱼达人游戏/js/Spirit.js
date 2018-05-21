//需要如下的参数：
    //img: 绘制所需的源图片对象
    //sx, sy: 从源图片对象中的截取位置
    //w, h；绘制的图片大小
    //x, y：图片在画布中的绘制位置（图片的中心位置，注意下面的处理）
    //rotation：绘制图形的旋转角度
    //scale：绘制图形额缩放大小
    //speend： 图形的移动速度(在使用时要手动分解成vx和vy)

class Spirit {
  constructor(options){
    this.img = options.img;

    this.sx = options.sx || 0;
    this.sy = options.sy || 0;

    this.w = options.w || this.img.width;
    this.h = options.h || this.img.height;

    this.x = options.x || 0;
    this.y = options.y || 0;

    this.rotation = options.rotation || 0;
    this.scaleX = options.scaleX || 1;
    this.scaleY = options.scaleY || 1;

    this.speed = options.speed || 0;

    //tick参数用来定义动画快慢（每几帧切换一次图片）
    this.tick = 0;
    this.max_tick = 0;          //各子类在使用时，使用自己定义的动画快慢

    //frame用来表示当前显示的是第几帧图片
    this.frame = 0;
    this.max_frame = 0;       //各子类在使用时，使用自己定义的最大帧数
  }
  //绘制
  draw(gd){
    gd.save();

    //绘图直接进行的transform变换（目的：1.让每个图形的绘图中心在图形的中心点处，2.从左右两边进来的鱼的倒影方向相同）
    gd.translate(this.x, this.y);
    gd.rotate(this.rotation*Math.PI/180);
    gd.scale(this.scaleX, this.scaleY);

    gd.drawImage(
      this.img,
      this.sx, this.sy, this.w, this.h,
      -this.w/2, -this.h/2, this.w, this.h
    )
    gd.restore();
  }
  //运动
  move(){
      let speed_x = this.speed*Math.sin(this.rotation*Math.PI/180);
      let speed_y = this.speed*Math.cos(this.rotation*Math.PI/180);

      this.x += speed_x;
      this.y -= speed_y;
  }
  //切换下一帧图片
  setFrame(frame){
    this.sy = frame*this.h;
  }
  nextFrame(){
    this.tick++;

    if(this.tick == this.max_tick){
      this.tick=0;
      this.frame++;

      if(this.frame == this.max_frame){
        this.frame = 0;
        this.setFrame(this.frame);
        return true;                       //该返回值用户判断当前的动画帧是一个周期
      }else{
        this.setFrame(this.frame);
        return false;
      }
    }
  }

  //判断当前图形（鱼和炮弹）是否离开了画布
  outOfCanvas(w, h){
    if(
      this.x < 0 - this.w/2 -100 ||
      this.y < 0 - this.h/2 - 100 ||
      this.x > w + this.w/2 + 100 ||
      this.y > h + this.h/2 + 100
    ){
      return true;
    }else{
      return false;
    }
  }

  //碰撞检测(参数是另一个图形对象)：
  collTest(spirit2){
    //这里将碰撞检测模型简化位一个圆（取图形宽和高中的最小值最为圆的半径）
    let r1 = Math.min(this.w/2, this.h/2);        //当前图形的半径
    let r2 = Math.min(spirit2.w/2, spirit2.h/2);  //另一个对象的半径

    let dis = Math.sqrt(Math.pow(this.x - spirit2.x, 2) + Math.pow(this.y - spirit2.y, 2));   //两个图形中心点的距离

    return dis <= (r1 + r2);
  }
}

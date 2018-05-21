//定义一个画按钮的类，传入两个参数：
    //data：     正常按钮的图片内容
    //data_down：点击按钮时切换显示的图片内容

class Button extends Spirit{
  constructor(data, data_down){
    super({
      img: data.img,
      sx: data.frame.x,
      sy: data.frame.y,
      w: data.frame.w,
      h: data.frame.h
    })

    this.data = data;
    this.data_down = data_down;
  }

  //检查是否点击在按钮图片上
  _check(x, y){
    if(this.x-this.w/2 < x && x < this.x + this.w/2 &&
      this.y - this.h/2 < y && y < this.y + this.h/2){
        return true;
    }else{
      return false;
    }
  }

  //当点击（鼠标点下时）在按钮图片上时，就切换另一张图片：
  checkDown(x, y){
    if(this._check(x, y)){
      this.img = this.data_down.img;
      this.sx = this.data_down.frame.x;
      this.sy = this.data_down.frame.y;
      this.w = this.data_down.frame.w;
      this.h = this.data_down.frame.h;

      return true;
    }else{
      return false;
    }
  }
  //当鼠标抬起时，图片恢复成原图片：
  checkUp(x, y){
    if(this._check(x, y)){
      this.img = this.data.img;
      this.sx = this.data.frame.x;
      this.sy = this.data.frame.y;
      this.w = this.data.frame.w;
      this.h = this.data.frame.h;
    }
  }
}

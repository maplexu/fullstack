//接口

interface Shape{
  area():number
}
interface Shape2{
  draw():void
}

class Rect implements Shape,Shape2{
  constructor(private width:number, private height:number){}

  area():number{
    return this.width*this.height;
  }
  draw():void{

  }
}

let r:Shape = new Rect(100, 200);
console.log(r.area());

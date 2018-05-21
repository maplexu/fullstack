//抽象

//定义一个抽象类
abstract class Shape {
  abstract draw(gd):void;
  abstract area():number;
  abstract pointin(x:number, y:number):boolean
}

//定义一个画矩形的类，继承上面的抽象类
class Rect extends Shape{
  constructor(private width: number, private height: number){
    super();
  }

  draw(gd):void{
    gd.fillRect(0, 0, this.width, this.height);
  }
  area():number{
    return this.width*this.height;
  }
  pointin(x:number, y:number):boolean{
    return false;
  }
}

//定义一圆的类，继承上面的抽象类：
class Circle extends Shape{
  constructor(private cx:number, private cy:number, private r:number){
    super();
  }

  draw(gd):void{
    gd.arc();
  }
  area():number{
    return Math.PI*Math.pow(this.r, 2);
  }
  pointin(x:number, y:number):boolean{
    return true;
  }
}

//多台：子类其实都是父类（子类变量就是父类变量）：
let a:Shape;
a = new Rect(400, 300);
console.log(a.area());

a = new Circle(400, 300, 150);
console.log(a.area());

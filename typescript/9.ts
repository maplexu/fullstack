//typescript的类：

class Person {
  protected name:string;
  private age:number;

  constructor(name: string, age: number){
    this.name = name;
    this.age = age;
  }

  protected show():void{
    console.log(`名字：${this.name}， 年龄：${this.age}`);
  }
}

class Staff extends Person{
  private job:string;

  constructor(name: string, age: number, job: string){
    super(name, age);

    this.job = job;
  }
  public show():void{
    super.show();

    console.log(`岗位：${this.job}`);
  }
}

let s:Staff = new Staff('blue', 18, '打杂的');

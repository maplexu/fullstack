//static修饰符的使用

class Person {
  public static user:string = 'blue';

  constructor(name:string, private age:number){

  }
}

let p:Person = new Person('blue', 18);
console.log(Person.user);

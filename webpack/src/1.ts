class Person{
  constructor(private name: string, private age: number){}

  show(){
    console.log(`name:${this.name}，age:${this.age}`);
  }
}

let p:Person = new Person('blue', 18);
p.show();

//访问器的使用
class Person{
  private _name:string;

  constructor(name: string){
    this._name = name;
  }

  get name():string{
    return this._name;
  }
  set name(newName: string){
    if(newName.length<8){
      throw new Error('名字至少是8位');
    }else{
      this._name = newName;
    }
  }
}

let p:Person = new Person('blue');
p.name = 'xczxsadasdasd';

console.log(p.name);

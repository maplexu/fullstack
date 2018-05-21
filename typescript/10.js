var Person = /** @class */ (function () {
    function Person(name, age) {
        this.age = age;
    }
    Person.user = 'blue';
    return Person;
}());
var p = new Person('blue', 18);
console.log(Person.user);

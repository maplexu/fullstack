//访问器的使用
var Person = /** @class */ (function () {
    function Person(name) {
        this._name = name;
    }
    Object.defineProperty(Person.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (newName) {
            if (newName.length < 8) {
                throw new Error('名字至少是8位');
            }
            else {
                this._name = newName;
            }
        },
        enumerable: true,
        configurable: true
    });
    return Person;
}());
var p = new Person('blue');
p.name = 'xczxsadasdasd';
console.log(p.name);

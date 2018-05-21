//抽象
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//定义一个抽象类
var Shape = /** @class */ (function () {
    function Shape() {
    }
    return Shape;
}());
//定义一个画矩形的类，继承上面的抽象类
var Rect = /** @class */ (function (_super) {
    __extends(Rect, _super);
    function Rect(width, height) {
        var _this = _super.call(this) || this;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    Rect.prototype.draw = function (gd) {
        gd.fillRect(0, 0, this.width, this.height);
    };
    Rect.prototype.area = function () {
        return this.width * this.height;
    };
    Rect.prototype.pointin = function (x, y) {
        return false;
    };
    return Rect;
}(Shape));
//定义一圆的类，继承上面的抽象类：
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(cx, cy, r) {
        var _this = _super.call(this) || this;
        _this.cx = cx;
        _this.cy = cy;
        _this.r = r;
        return _this;
    }
    Circle.prototype.draw = function (gd) {
        gd.arc();
    };
    Circle.prototype.area = function () {
        return Math.PI * Math.pow(this.r, 2);
    };
    Circle.prototype.pointin = function (x, y) {
        return true;
    };
    return Circle;
}(Shape));
//多台：子类其实都是父类（子类变量就是父类变量）：
var a;
a = new Rect(400, 300);
console.log(a.area());
a = new Circle(400, 300, 150);
console.log(a.area());

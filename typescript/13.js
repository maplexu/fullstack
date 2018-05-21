//接口
var Rect = /** @class */ (function () {
    function Rect(width, height) {
        this.width = width;
        this.height = height;
    }
    Rect.prototype.area = function () {
        return this.width * this.height;
    };
    Rect.prototype.draw = function () {
    };
    return Rect;
}());
var r = new Rect(100, 200);
console.log(r.area());

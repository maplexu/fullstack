//枚举类型
//1.先定义一个枚举类型（分配可用值）
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
;
//2.用该枚举类型声明变量（变量的值必须要是该枚举类型中的可用值）
var gender = Gender.Male;

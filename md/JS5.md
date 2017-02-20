# JS笔记5（面向对象）

标签（空格分隔）： 未分类

---

## 1. 属性类型
### 1. 数据属性
修改属性默认的特性：Object.defineProperty（）
1. $[[Configurable]]$
2. $[[Enumerable]]$
3. $[[Writable]]$
4. $[[Value]]$
### 2. 访问器属性
访问器属性不包含数据值，包含一对儿$&getter$和$&setter$函数。访问器属性有4个特性：
1. $[[Configurable]]$
2. $[[Enumerable]]$
3. $[[Get]]$
4. $[[Set]]$
访问器属性不能直接定义，必须使用Object.defineProperty（）定义。设置一个属性额值会导致其他属性发生变化。
Object.defineProperties（）。
Object.getOwnPropertyDescriptor（）。

## 2. new
1. new命令的作用，就是执行构造函数，返回一个实例对象。
2. new命令的原理：
    1. 创建一个新对象。
    2. 将构造函数的作用域赋给新对象（因此this指向这个新对象）
    3. 执行构造函数中的代码。（为这个新对象添加属性）
    4. 返回新对象。
3. new命令总是返回一个对象，要么是实例对象，要么是return语句指定的对象。
4. 函数内部可以使用new.target属性。如果当前函数是new命令调用，new.target指向当前函数，否则为undefined。

## 3. 原型
1. 只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。
2. 默认情况下，所有原型对象都会自动获得一个constructor属性，这个属性是指向prototype属性所在函数的指针。
3. 当调用构造函数创建一个新实例后，该实例的内部将包含一个指针（$[[Prototype]]$），指向构造函数的原型对象。这个连接存在与实例与构造函数的原型对象之间。而不是存在与实例与构造函数之间。
4. 可以通过isPrototype确定__proto__($Array.prototype.isPrototype([1])$)
5. $Object.getPrototypeOf([1]) = > Array.prototype$
6. $[1].hasOwnProperty('length')$
7. $Object.keys()$返回可枚举属性的数组。
8. $Object.getOwnProperty()$返回实例属性。
9. 尽管可以随时为原型添加属性和方法，并且修改能够立即在所有对象实例中反映出来，但如果重写整个原型对象时，就切断了构造函数与最初原型之间的联系，引用的依然是最初的原型。**实例中的指针仅指向原型，而不指向构造函数**
```javascript
function A(){};
var a = new A();
a.__proto__ === A.prototype
A.prototype = {constructor: A};
a.__proto__ !== A.prototype
```
## 4. 构造函数的继承
只支持实现继承，主要依靠原型链。由于函数没有签名，无法实现接口继承。
```javascript
function Sub(value) {
  Super.call(this);
  this.prop = value;
}
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;
Sub.prototype.method = '...';
```

## 7. Object
1. constructor。                                             2. toString。
3. valueOf。
4. hasOwnProperty。
5. isPrototypeOf。
6. propertyIsEnumerable。
7. keys。
8. getOwnPropertyNames。




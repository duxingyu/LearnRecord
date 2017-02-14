# JS笔记5

标签（空格分隔）： 未分类

---

## 1. new
1. new命令的作用，就是执行构造函数，返回一个实例对象。
2. new命令的原理：
    1. 创建一个新对象。
    2. 将构造函数的作用域赋给新对象（因此this指向这个新对象）
    3. 执行构造函数中的代码。（为这个新对象添加属性）
    4. 返回新对象。
3. new命令总是返回一个对象，要么是实例对象，要么是return语句指定的对象。
4. 函数内部可以使用new.target属性。如果当前函数是new命令调用，new.target指向当前函数，否则为undefined。

## 2. 构造函数的继承
```javascript
function Sub(value) {
  Super.call(this);
  this.prop = value;
}
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;
Sub.prototype.method = '...';
```




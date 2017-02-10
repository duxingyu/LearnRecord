# JS高程记录1

标签（空格分隔）： 未分类

---

## 1. script标签相关
1. defer属性：脚本会被延迟到整个页面都解析完毕后再运行。先下载，后延迟执行。会先于`document.DOMContentLoaded`事件执行。多个顺序执行。
2. async属性：异步执行，先下载，会在`window.load`事件前执行，`DOMContentLoaded`事件前或后执行。多个执行顺序不定。

两者若在`DOMContentLoaded`事件前执行，则此时dom树已渲染完毕。
## 2. 特殊操作符相关
### 1. typeof
typeof null 为object。typeof undefined为undefined，未声明及未初始化的var变量返回undefined。

## 3. Null类型相关
1. `null`表示一个空对象指针（没有对象该有的方法和属性）。因此typeof操作符检测时会返回`object`。
2. 若定义的变量准备用来保存对象，最好将其初始化为null。
3. `null == undefined`。`Boolean(null) => false`。
4. 判断数据类型：`Object.prototype.toString.call()`。

## 4. Boolean类型相关
会转换为false的值：`false`,空字符串，0或NaN，null，undefined。

## 5. Number类型相关
1. 正零与负零，整数小数部分。小数精度问题。
2. 能够表示的数值范围：`Number.MAX_VALUE ~ Number.MIN_VALUE`，正无穷与负无穷：`Number.NEGATIVE_INFINITE(-infinite) ~ Number.POSITIVE_INFINITE(+infinite)`。能够精确表示的整数：`Number.MAX_SAFE_INTEGER ~ Number.MIN_SAFE_INTEGER`。
3. `NaN`。表示一个本来要返回数值的操作数未返回数值的情况。0/0 = NaN, 1/0 = Infinite, -1/0 = -Infinite。
4. 数值转换：Boolean值转为0/1，null转为0，undefined转为NaN，空字符串转为0，对象先调用`valueOf()`，如果为NaN，则调用`toString()`([].toString() => '')。
5.  parseInt()可以指定基数来进行进制转换,parseFloat()只解析十进制值。

### 包装对象相关
1. `toString()`：接受一个参数，表示输出的进制。如果直接为数字，`10.tonString()`会报错，因为会将点解析小数点，解决方式：加括号，再加一个点，属性方法方括号形式。先转换进制，后输出相应的字符串表示。
2. `toFixed()`：将一个数转为指定位数小数的字符串表示。
3. `toExponential()`：科学计数法 。
4. `toPrecision()`：有效数字。
5. 构造函数和转型函数不同。

## 6. String类型相关
1. 字符串一旦创建，他们的值就不能改变。
2. `String()`有toString方法则调用，null返回null，undefined返回undefined。
3. base64转码：atob(),btoa()。要将非ASCII码字符（如汉字）转为Base64编码：`btoa(encodeURIComponent(str))`,`decodeURIComponent(atob())`。

### 包装对象相关
1. charAt同方括号表示法，charCodeAt，同接收一个参数。返回字符或字符编码/空字符串或NaN。
2. concat同+操作符。
3. slice，substr，substring。
4. indexOf，lastIndexOf。
5. trim，trimLeft，trimRight。
6. toLowerCase，toUpperCase。
7. localeCompare()，比较两个字符串。
8. String.fromCharCode。

## 7. 操作符相关
1. */%-: 非数值调用Number()。
2. +: 有字符串，非字符串调用toString或String。
3. <>: 转换为数值。NaN。
4. ==： 数值优先，valueOf。
5. ,操作符用于赋值时，返回表达式最后一个。

垃圾回收机制：标记清除，引用计数，优化内存：将全局变量和全局对象的属性值设为null来解除引用，让值脱离执行环境。
所有函数的参数都是按值传递的。复制。

## 8. 对象
### 1. array
1. `valueOf()`：返回该数组。
2. `toString()`：返回有数组中每个值的字符串形式拼接的以逗号分割的字符串。
3. `Array.isArray()`。iframe。
4. 不改变原数组：join，concat，slice，迭代方法（fun,this)：every，some（返回boolean），map，filter（返回数组）,forEach。indexOf，lastIndexOf（返回index/-1）。reduce，reduceRight((prev,next,index,array),初值)。
5. 改变原数组：push，unshift（返回length），pop，shift（返回去掉的值），splice（返回被删除的数组），sort（>0换位置），reverse。


### 2. Data
1. `valueOf()`：毫秒表示。
2. `toString()`。
3. 日期字符串的完整格式是“month day, year hours:minutes:seconds”。如`'June 21,2015 12:23:14'`。或`year, month [, day, hours, minutes, seconds, ms]`。

### 3. RegExp
1. `valueOf()`：返回本身。
2. `toString()`：返回字符串表示。
3. 实例属性：source（返回字符串表示，无斜杠），ignoreCase，global，multiline（返回boolean），lastIndex（有g才有意义）。
4. 实例方法：test（返回boolean）
5. exec（返回匹配的字符串/null），有input（原字符串）和index两个属性。

#### 1. 字符串相关
1. match：返回数组/null。
2. serach：返回第一个匹配结果的index/-1。
3. replace：第二个参数使用比较复杂。。。。
4. split：第二参数为数组成员个数。

### 4. Function
1. `valueOf()`：函数本身。
2. `toString()`：函数字符串化。
3. 函数是对象，函数名是指针。
4. 变量提升，函数表达式与函数声明不同点。
5. length：要接收的参数个数。可以用来实现重载。
6. prototype：不可枚举。
7. apply，call非继承而来的方法。
8. **函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。**！！！！！
9. 闭包的最大用处有两个，一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。封装对象的私有属性和私有方法。
10. IIFE：不必为函数命名，避免了污染全局变量；二是IIFE内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。

### 5. Global
1. URI编码：encodeURI,encodeURIComponent,decodeURI,decodeURIComponent.
2. 属性：undefined,NaN,Infinite,Object,Array,Function,Boolean,String,Number,Date,RegExp,Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError

### 6. Math
1. min，max，ceil，floor，round，random，abs，pow，sqrt。

## 7. Object
1. constructor。
2. toString。
3. valueOf。
4. hasOwnProperty。
5. isPrototypeOf。
6. propertyIsEnumerable。
7. keys。
8. getOwnPropertyNames。

## 8. JSON
1. JSON.stringify：第二参数为数组，表示要转换的属性。第三参数用来提高可读性。字符串或数字（空格数）。
2. JSON.parse。


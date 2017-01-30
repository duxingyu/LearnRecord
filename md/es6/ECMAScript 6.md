# ECMAScript 6

标签（空格分隔）： js

---

## **1. let和const命令**
1. `for`循环中，循环语句部分是一个父作用域，循环体内部是一个单独的子作用域。函数内部与外部同名变量是分离的。
2. 不存在变量提升。变量要在声明后使用。
3. **暂时性死区（temporal dead zone，简称 TDZ）**。在代码块内，使用let，const命令声明变量前不可使用该变量。
4. TDZ意味着typeof不再是一个百分百安全的操作。
5. 不允许重复声明。
6. 允许在块级作用域中声明函数，在作用域外不可使用，但浏览器目前可以使用。
7. `*`do表达式，本质上，块级作用域是一个语句，没有返回值，提案：在作用域前加do，可以返回值。
8. const声明的变量不得改变值，意味着，一旦声明，必须初始化。只声明不赋值会报错。
9. const对于复合型变量，指向数据所在的地址，只保证指向的地址不变。
10. 将对象冻结：`Object.freeze({})`,只冻结了对象，若对象的某个属性是对象，可以改变该对象属性的属性。
11. 变量声明：`var`,`function`,`let`,`const`,`import`,`class`。
12. var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。
```javascript
var constantize = obj => {
    Object.freeze(obj);
    Object.keys(obj).forEach((key,value) => {
        if (typeof obj[key] === 'object') {
            constantize(obj[key]);
        }
    });
};
```

## **2. 解构赋值**
### **1. 数组的解构赋值**
1. 解构不成功，值为`undefined`。只要某种数据结构具有`Iterator`接口，都可以采用数组形式的解构赋值。若没有该接口，会报错。
2. 解构赋值允许指定默认值。若默认值不严格等于`undefined`，默认值不生效。
3. 如果默认值是一个表达式，该表达式是惰性求值的。
4. 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

### **2. 对象的解构赋值**
1. 对象解构，变量的取值由位置决定，而对象属性无序，变量需与属性同名。
2. 如果变量名与属性名不一致，应写为`let {foo: baz} = {foo: x};bar = x`。说明，对象的解构赋值是下面形式的简写：`let {foo:foo} = {foo:x};foo = x`。
3. 使用解构赋值，变量声明与赋值是一体的。对于`let`和`const`，不能重新声明。
4. 若`let`，`var`已声明，解构赋值应写为`({foo} = {})`，因为解析器会将其解析为代码块，而非赋值语句。
5. 默认值同数组的解构赋值。
6. 如果解构模式是嵌套的对象，且子对象所在的父属性不存在，会报错，因为`undefined`。
7. 解构规则：不是对象先转为对象，由于`undefined`,`null`不能转为对象，会报错。转为对象后若没有Iterator接口则报错。
8. 函数参数解构`{x = 0, y = 0} = {}`。
9. 可以使用圆括号的情况：赋值语句的非模式部分。
10. 用途：
```javascript
// 1. 交换变量的值
[x, y] = [y, x];
// 2. 从函数中返回多个值
function fn(){return [1,2]/{a:1,b:2};}
// 3. 函数参数的定义
function fn([x,y]/{x,y}){}; fn([1,2](有序)/{x:1,y:2}(无序))
// 4. 提取json数据
// 5. 函数参数的默认值
// 6. 遍历Map结构
for (let [key,value] of map){}
// 7. 输入模块的指定方法
const {a,b} = require();
import {a,b} from module;
```

## **3. 字符串的扩展**
1. 字符串的Unicode表示`\u{20bb7}`。
2. 字符串表示方法6种：`z`,`\z`,`\172`,`\x7A`,`\u007A`,`\u{7A}`。
3. JS内部，字符以`UTF-16`格式存储，每个字符固定为2个字节。对于Unicode码点大于`0xFFFF`的字符会认为是两个字符。
4. `charAt`，`charCodeAt`，`length`,`String.fromCharCode`不能正确处理。
5. `codePointAt(i)`返回结果为十进制值，十六进制需使用`toString(16)`。因`length`不正确，因使用`for...of`循环处理。
6. `codePointAt`是测试一个字符串由几个字符组成最简单的方法。
```javascript
var s = '𠮷a𠮷a';
for (let ch of s){
    console.log(ch.codePointAt(0).toString(16);}
s.codePointAt(0) > 0xFFFF
```
1. `String.fromCodePoint()`对应`String.formCharCode`。
2. 字符串的遍历接口，可识别大于`0xFFFF`的字符。
3. `*` `at()`对应charAt()。
4. `normalize()`，实例方法，Unicode正规化。
5. 传统上，JS只有`indexOf`方法确定一个字符串是否包含在另一个字符串中。ES6提供了`includes()`，`startWith()`，`endsWith()`。返回布尔值。支持第二参数，表示开始搜索位置。
6. `repeat(i)`。
7. `*`（ES7）`padStart()`，`padEnd()`接受两个参数，指定字符串的最小长度，用来补全的字符串。省略第二参，使用空格补全。
8. 模板字符串。
9. 可以紧跟在一个函数名后面，即**标签模板（tagged template）**。`tag(arr,...s){output += arr[i] + s[i];}`。应用：过滤HTML字符串，防止用户恶意输入。多语言处理。
10. String.raw()返回一个斜杠都被转义的字符串。往往用来充当模板字符串的处理函数。

## **4. 正则的扩展**
1. 如果RegExp构造函数第一个参数是一个正则对象，使用第二参数指定修饰符，会忽略原有的修饰符。`new RegExp(/abc/g,'ig')`。
2. 字符串的正则方法`match`,`replace`,`serach`,`split`，在语言内部全部调用RegExp的实例方法。如`String.prototype.match => RegExp.prototype[Symbol.match]`。
3. U修饰符用来正确处理大于\uFFFF的unicode字符。点字符是除了换行符外的任意单个字符，处理需加u，使用大括号表示字符，需加u，量词识别，预定义模式如\d，i修饰符。
4. Y修饰符叫做**粘连修饰符（sticky）**。全局匹配，匹配必须从剩余的第一位开始。使用lalstIndex属性指定每次搜索的开始位置，g也可以。y修饰符隐含了头部匹配的标志^。在split中使用只要匹配成功，第一成员肯定为空字符串。应用：提取**词元（token）**。
5. `sticky`属性，是否设置了y修饰符。`flags`属性，返回修饰符。
6. *`RegExp.escape()`。
7. `*`s修饰符，doAll模式，点代表一切字符。
8. ***后行断言（lookbehind）**，JS只支持先行及先行否定。
9. `*`Unicode属性类。

**先行断言（lookahead）**：x只有在y前面才匹配：`/x(?=%)/`。
**先行否定断言（negative lookahead）**：x只有不在y前面才匹配：`/x(?!y)/`。

## **5. 数值的扩展**
以下除parseInt及parseFloat外的方法，均不处理非数值。
1. 二进制和八进制表示法：`0b/0B`，`0o/0O`。将0b和0o前缀的字符串转为十进制，应使用Number()。
2. `Number.isFinite()`，`Number.isNaN()`与传统的`isFinite()`和`isNaN()`的区别：只对数值有效，而后者先调用Number()转为数值，再进行判断。
3. `Number.parseInt()`和`Number.parseFloat()`：行为相同，目的：逐步减少全局性方法，使语言逐步模块化。
4. `Number.isInteger()`判断一个值是否为整数，由于在JS中整数和浮点数是同样的储存方法，所以3和3.0为同一个值。
5. `Number.EPSILON`为一个极小的常量，目的在于为浮点数计算，设置一个误差范围。若误差小于该常量，可以认为得到了正确结果。
6. 安全整数：`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`，为`Number.isSafeInteger()`的上下限。使用该函数，需要注意：验证运算结果是否在安全整数范围内，需要同时验证参与运算的每个值。

### **1. Math对象扩展**
适用于非数值，先使用Number转为数值。
1. `Math.trunc()`：去掉小数部分，返回整数部分。为空及无法截取返回NaN。
2. `Math.sign()`：判断一个数为正数，负数，零。返回`+1,-1,+0,-0,NaN`。
3. `Math.cbrt()`：用于计算一个数的立方根。Math.cbrt(8) = 2。
4. `Math.clz32()`：返回一个数的32位无符号整数形式零的个数。左移运算符（<<）与Math.clz32直接相关。对于小数，只考虑整数部分。
5. `Math.imul()`：返回两个数以32位带符号整数形式相乘的结果。对于很大的数的乘法，低位数值往往不精确，Math.imul()可以返回正确的低位数值。
6. `Math.fround()`：返回一个数的单精度浮点数形式。用于无法用64个二进制精确表示的小数。
7. `Math.hypot()`：返回所有参数的平方和的平方根。`Math.hypot(3,4) => 5`。
8. `Math.expm1(x)`：返回返回e^x - 1，即Math.exp(x) - 1。
9. `Math.log1p(x)`：返回1+x的自然对数，即Math.log(1+x)。如果x < -1,返回NaN。
10. `Math.log10(x)`：返回以10为底的x的对数，如果x<0，返回NaN，即Math.log(x)/Math.LN10。
11. `Math.log2(x)`：返回以2为底的x的对数。同上。
12. `Math.sinh(x)`,`Math.consh(x)`，`Math.tanh(x)`，`Math.asinh(x)`，`Math.acosh(x)`，`Math.atanh(x)`。双曲正弦，反双曲正弦。
13. 指数运算符：`**`。赋值：`**=`。在V8引擎中，与`Math.pow`的实现不同，对于特别大的运算结果，会有细微差别。

## **6. 数组的扩展**
1. `Array.from()`将两类对象转为真正的数组。**类数组（array-like object）**和**可遍历（iterable）**。同`[].slice.call()`。所谓类数组对象，本质特征只有一点，即必须有`length`属性。扩展运算符背后调用的是遍历器接口（Symbol.iterator）。可接受第二参数，类似与数组的map方法。可以处理Unicode字符，（`Array.from(str).length`）。
2. `Array.of()`：将一组值转为数组。目的：弥补数组构造函数Array()的不足。不存在由于参数不同而导致的重载。没参数返回空数组。
3. `copyWithin()`在当前数组内部，将指定位置的成员复制到其他位置。返回当前数组，会修改当前数组。
4. `find()`：找出第一个符合条件的数组成员，参数为一个回调`(value,index,arr)`，返回该成员。没有返回undefined。
5. `findIndex()`：同上，返回位置，均可以发现NaN，弥补了数组的IndexOf方法的不足。利用`Object.is(NaN,value)`找到NaN。
6. `fill()`：使用给定值，填充一个数组。使用二三参数来指定填充起始与终止位置。
7. `entries()`，`keys()`，`values()`用于遍历数组。返回一个遍历器对象。
8. `includes()`返回一个布尔值。与字符串的includes方法类似，二参表示搜索起始位置。indexOf的缺点：不够语义化，返回值为数值，不够直观，使用===判断，对NaN误判。`（map.has(key),Reflect.has(obj,key),set.has(val))`。
9. 尽量避免出现空位。[,,].length = 2

## **7. 函数的扩展**
1. 函数参数的默认值，不能使用let和const再次声明，惰性求值。
2. 函数的length属性，指定参数默认值后将失真。返回没有指定的个数。 rest参数也不计入。
3. rest参数中的变量代表一个数组。
4. **扩展运算符（spread）**将一个数组转为用逗号分割的参数序列。主要用于函数调用。如`arr.push(...arr1)`。可以用来取代apply方法。如`Math.max(...arr)`。应用：
    1. 合并数组：`arr.concat(arr1,arr2) => [...arr1,...arr2]`
    2. 与解构赋值结合：`[a,...arr1] = arr`
    3. 函数的返回值。
    4. 字符串转数组，适用于unicode。`[...str].length`
    5. 实现了Iterator接口的对象。
5. 只要参数使用了默认值，解构赋值，或扩展运算符，就不能显式的指定严格模式。
6. name属性，返回函数的函数名，函数表达式：匿名返回实际函数名。使用Function构造函数返回的实例，值为`anonymous`。bind返回的函数，属性前加上bound前缀（`bound foo`)。
7. 箭头函数，若返回值为对象，需加大括号。函数体内的this是定义时所在的对象。不可以当作构造函数，使用new命令，不可以使用arguments，yield命令，不能用作Generator函数。适用于回调，可以方便的改写λ验算。
8. `*b`绑定this，并排双冒号（`::`），左边为对象，右边为函数，将左边的对象作为上下文环境绑定到右边的函数上。返回原对象。
9. **尾调用（Tail Call）优化（optimization）**。尾调用指某个函数的最后一步是调用另一个函数。即`return f()`。不一定是函数尾部，最后一步操作即可。只有不再用到外层函数的内部变量，才能进行优化。只在严格模式开启。

函数调用会在内存中形成一个调用记录，又称**调用帧（call frame）**，保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。所有的调用帧形成一个**调用栈（call stack）**。尾调用由于是最后一步操作，所以不需要保留外层函数的调用帧，内层取代外层调用帧，调用栈可以缩短。
尾递归：函数尾调用自身。递归耗内存，容易发生**栈溢出（stack overflow）**，尾递归只存在一个调用帧，不会发生栈溢出。
递归函数的改写：
1. 在尾递归函数之外，再提供一个正常形式的函数。
2. **柯里化（currying）**。
`*`函数参数的**尾逗号（trailing comma）**。

## **8. 对象的扩展**
1. 允许直接写入变量和函数，作为对象的属性和方法。如`return {x,y} === return {x:x,y:y}`。Generator函数前面加星号。
2. 属性名表达式。字面量定义对象时，可以使用[表达式]来作为对象属性名，方法名。属性名表达式和简洁表示法不能同时使用。属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]。
3. 方法的name属性：返回函数名，如果使用了**取值函数（getter）**和**存值函数（setter）**，返回值是方法名前加上get和set。bind和Function同函数，如果是Symbol值，返回该值描述。
4. `Object.is()`：比较两个值是否相等。部署了**同值相等（Same-value equality）**算法。`+0 ≠ -0`,`NaN = NaN`。
5. `Object.assign()`：用于对象的合并。将源对象的所有可枚举属性复制到目标对象。一参为目标对象，不可为null和undefined。二参为源对象无法转为对象会跳过，字符串会以数组形式拷贝入目标对象。不拷贝继承属性。只为浅拷贝，为对象的引用。对于嵌套对象，遇到同名属性，是替换而非添加。可以处理数组，但会将其视为对象。用途：
    1. 为对象添加属性：`class A {constructor(x){Object.assign(this,{x})}}`。
    2. 为对象添加方法：`Object.assign(A.prototype,fn1,fn2)`
    3. 克隆对象：`obj1 = Object.assign({},obj);`,深克隆：`obj1 = Object.assign(Object.create(Object.getPrototypeOf(obj),obj))`
    4. 合并多个对象。
    5. 为属性指定默认值。`obj1 = Object.assign({},default,obj1)`
6.  对象的每个属性都有一个**描述对象（Descriptor）**，用来控制该属性的行为。`Object.getOwnPropertyDescriptor`，Class的原型方法都是不可枚举的。
7.  属性的遍历：（规则：数值（按数字），字符串（时间），Symbol（时间））
    1. `for...in`：自身+继承+可枚举。
    2. `Object.keys(obj)`：=>arr，自身+可枚举。
    3. `Object.getOwnPropertyNames(obj)`：=>arr，自身。
    4. `Object.getOwnPropertySymbols(obj)`：=>arr，symbol。
    5. `Reflect.ownKeys(obj)`：=> arr，自身+symbol。
8. `__proto__(隐式原型)`：用来读取或设置当前对象的prototype对象（指向构造该对象的构造函数的原型）`a.__proto__ === A.prototype === a.constructor.prototype`。无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的`Object.setPrototypeOf()（写操作）`、`Object.getPrototypeOf()（读操作）`、`Object.create(A.prototype)（生成操作）`代替。
9. `Object.keys()`,`Object.values()`,`Object.entries()`。
10. `*b` 将rest（解构赋值）/扩展运算符引入对象。
11. `*` `Object.getOwnPropertyDescriptor(obj)`返回指定对象所有自身属性（非继承）的描述对象。

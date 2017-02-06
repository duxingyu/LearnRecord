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
4. **扩展运算符（spread）**将一个数组转为用逗号分割的参数序列。主要用于函数调用。内部使用for...of循环。如`arr.push(...arr1)`。可以用来取代apply方法。如`Math.max(...arr)`。应用：
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

## **9. Symbol**
1. Symbol是JS语言的第七种数据类型。对象的属性名有两种：字符串，Symbol。不能使用new命令，因为生成的Symbol是一个原始类型的值，不是对象。类似与字符串，不能添加属性。
2. 可以接受一个字符串作为参数，表示对象Symbol实例的描述。主要是为了在控制台显示，或转为字符串时，容易区分。
3. Symbol函数的参数只表示对当前值的描述，因此相同参数的Symbol函数的返回值不等。
4. 不能与其他类型的只进行运算。会报错。但可以显式转为字符串（String()，sym.toString()）。可以转为布尔值。`if(sym)`。
5. 作为属性名，对于一个对象有多个模块构成的情况很有用。作为属性名，不能使用点运算符。在对象内部，使用Symbol值定义属性时，必须放在[]内。可以用于定义一组常量，保证这组常量的值都不等。
6. 用途：消除魔术字符串。将其改为变量，值使用Symbol。
7. 非私有属性，遍历可以使用`Object.getOwnPropertySymbols(obj)`，`Reflect.ownKeys(obj)`。由于不会被常规方法遍历得到，可以为对象定义一些非私有，但又希望只用于内部的方法。
8. `Symbol.for()`接受一个字符串作为参数，没有创建，然后返回该值。有返回该值。只能为Symbol.for创建的才会搜索到。Symbol.for为Symbol值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值。

### **1. 内置的Symbol值**
1. `Symbol.hasInstance`：指向一个内部方法，当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。`class A{[Symbol.hasInstance](obj){}}`。
2. `Symbol.isConcatSpreadable`：等于一个布尔值，表示该对象使用`Array.prototype.concat()`方法时，是否可以展开，默认可以展开，值为`undefined`或`true`都可以展开。
3. `Symbol.species`：指向当前对象的构造函数。创造实例时，默认调用该方法。默认写法：`static get [Symbol species(){return this}`。
4. `Symbol.match`。
5. `Symbol.replace`。
6. `Symbol.search`。
7. `Symbol.split`。
8. `Symbol.iterator`：指向该对象的默认遍历器方法。
9. `Symbol.toPrimitive`：转为原始类型值时调用。
10. `Symbol.toStringTag`：指向一个方法。可以用来 定制`[object Object]·中object后的字符串。
11. `Symbol.unscopables`。

## **10. Set和Map数据结构**
部署了同值相等算法（如Object.is()）。
### **1. Set，WeakSet**
1. Set接受一个数组（或类数组对象）作为参数，用来初始化。
2. 数组去重：`[...new Set(arr)]`，`Array.from(new Set(arr))`。
3. 实例属性：
    1. `constructor`：Set函数。
    2. `size`：成员总数。
4. 实例方法：
    1. 操作方法：
        1. `add(value)`：返回改变后set。
        2. `delete(value)`：返回boolean。
        3. `has(value)`：返回boolean。
        4. `clear()`
    2. 遍历方法：（顺序：插入顺序）
        1. `keys()`：遍历器对象。
        2. `values()`：遍历器对象。同keys()。
        3. `entries()`：遍历器对象。
        4. `forEach(fn(key,value,set),this)`：没有返回值。
5. 在遍历操作中，同步改变原来的Set结构，没有直接方法。
6. WeakSet成员只能是对象。成员对象为弱引用，意味着：无法引用WeakSet的成员，因此WeakSet是不可遍历的。方法：add,delete,has。没有size属性。WeakSet的一个用处，是储存DOM节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

### **2. Map和WeakMap**
1. Map类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
2. 实例属性与方法与Set大体相同，除去add，增加`get(value)`，`set(key,value)`。默认遍历方法为entries方法。
3. 与其他数据结构的转换：map=>array,array=>map,map=>obj,obj=>map,map=>json（对象json，数组json),json=>map。
4. WeakMap应用：DOM节点作为键名，部署私有属性。

## **11. Proxy**
1. Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种**元编程（meta programming）**，即对编程语言进行编程。
2. Proxy 实际上**重载（overload）**了点运算符，即用自己的定义覆盖了语言的原始定义。`new Proxy(target, handler)`。
3. Proxy 实例也可以作为其他对象的原型对象。
4. `Proxy.revocable`返回一个可取消的Proxy实例。该方法的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。
5. 在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。有些原生对象的内部属性，只有通过正确的this才能拿到，所以 Proxy 也无法代理这些原生对象的属性。
6. 一个技巧是将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用。
6. Proxy 对象可以拦截目标对象的任意属性，这使得它很合适用来写 Web 服务的客户端。同理，Proxy 也可以用来实现数据库的 ORM 层。

### **1. Proxy实例的方法**
1. `get(target, propKey, receiver)`：
2. `set(target, propKey, value, receiver)`：返回boolean。
3. `has(target, propKey)`：返回boolean。
4. `deleteProperty(target, propKey)`：返回boolean。
5. `ownKeys(target)`：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`返回一个数组。
6. `getOwnPropertyDescriptor(target, propKey)`：返回属性的描述对象。
7. `defineProperty(target, propKey, propDesc)`：返回boolean。
8. `preventExtensions(target)`：返回boolean。
9. `getPrototypeOf(target)`：返回一个对象。
10. `isExtensible(target)`：返回boolean。
11. `setPrototypeOf(target, proto)`：返回boolean。
12. `apply(target, object, args)`：拦截 Proxy 实例作为函数调用的操作。
13. `construct(target, args)`：拦截 Proxy 实例作为构造函数调用的操作。

```javascript
var obj = {
    name: 'duxy',
    proxy: new Proxy(this,{}
```

## **12. Reflect**
1. Reflect对象与Proxy对象一样，也是ES6 为了操作对象而提供的新 API。
2. 设计目的：
    1. 将Object对象的一些明显属于语言内部的方法，放到Reflect对象上
	2. 修改某些Object方法的返回结果，让其变得更合理
	3. 让Object操作都变成函数行为，某些Object操作是命令式的（如name in obj，delete obj[name]）
	4. Reflect对象的方法和Proxy对象的方法一一对应，使Proxy对象可以方法地调用对应的Reflect方法完成默认行为，作为修改行为的基础
3. 使用Proxy实现**观察者模式（Observer mode）**，函数自动观察数据对象，一旦对象有变化，函数就会自动执行。
```javascript
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}
const obj = observable({name:'duxy'});
function print(){
    console.log('改变了！');
}
observe(print);
```
### **1. 静态方法**
1. `Reflect.apply(target,thisArg,args)`：等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。
2. `Reflect.construct(target,args)`：等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。
3. `Reflect.get(target,name,receiver)`：查找并返回target对象的name属性，如果没有该属性，返回undefined。如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。
4. `Reflect.set(target,name,value,receiver)`：Reflect.set方法设置target对象的name属性等于value。
5. `Reflect.defineProperty(target,name,desc)`：Reflect.defineProperty方法基本等同于Object.defineProperty，用来为对象定义属性。
6. `Reflect.deleteProperty(target,name)`：Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回true；删除失败，被删除的属性依然存在，返回false。
7. `Reflect.has(target,name)`：Reflect.has方法对应name in obj里面的in运算符。
8. `Reflect.ownKeys(target)`：用于返回对象的所有属性。
9. `Reflect.isExtensible(target)`：对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
10. `Reflect.preventExtensions(target)`：对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
11. `Reflect.getOwnPropertyDescriptor(target, name)`：基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象。
12. `Reflect.getPrototypeOf(target)`：用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。
13. `Reflect.setPrototypeOf(target, prototype)`：方法用于设置对象的__proto__属性，对应Object.setPrototypeOf(obj, newProto)。

## **13. Iterator和for...of循环**
Iterator的遍历过程是这样的。
（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。
每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。
1. 调用Iterator接口的场合
    1. 解构赋值。
    2. 扩展运算符。
    3. yield*后面跟可遍历结构。
    4. 任何接受数组作为参数的场合。
2. 遍历器对象的`return()`：如果for...of循环提前退出（出错，break，continue），调用此方法，`throw()`：配合Generator函数使用，一般用不到。
3. for...of循环内部调用的是数据结构的Symbol.iterator方法。

## **14. Promise**
1. Promise对象的特点：
    1. 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和Rejected（已失败）。
    2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。
    3. 无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
2. Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从Pending变为Resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从Pending变为Rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
3. Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为Resolved时调用，第二个回调函数是Promise对象的状态变为Reject时调用。
## **15. async函数**
1. async函数对 Generator 函数的改进，体现在以下四点。
    1. 内置执行器。async函数的执行，与普通函数一模一样，只要一行。
    2. 更好的语义。async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
    3. 更广的适用性。async函数的await命令后面，可以是Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
    4. 返回值是 Promise。可以使用then方法添加回调函数。
2. async函数内部return语句返回的值，会成为then方法回调函数的参数。async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。
3. 正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行。这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
4. 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。`await Promise.all([getFoo(), getBar()])`
5. await命令只能用在async函数之中，如果用在普通函数，就会报错。

## **16.Class**
1. 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
2. constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。默认返回实例对象（即this），完全可以指定返回另外一个对象。类的构造函数，不使用new是没法调用的，会报错。
3. Class不存在**变量提升（hoist）**，这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。与函数一样，类也可以使用表达式的形式定义。
4. Class之间可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。
5. 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。
6. 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。
7. 子类的__proto__属性，表示构造函数的继承，总是指向父类.子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
8. 只要是一个有prototype属性的函数，就能被子类继承。由于函数都有prototype属性（除了Function.prototype函数），因此A可以是任意函数。
9. Object.getPrototypeOf方法可以用来从子类上获取父类。因此，可以使用这个方法判断，一个类是否继承了另一个类。
10. super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。第一种情况，super作为函数调用时，代表父类的构造函数。super()在这里相当于A.prototype.constructor.call(this)。作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。第二种情况，super作为对象时，指向父类的原型对象(A.prototype = super)。通过super调用父类的方法时，super会绑定子类的this。由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。
11. 在Class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
12. 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。父类的静态方法，可以被子类继承。静态方法也是可以从super对象上调用的。
13. `*b` 类的实例属性可以用等式，写入类的定义之中。类的静态属性只要在上面的实例属性写法前面，加上static关键字就可以了。
14. `*` 为class加了私有属性。方法是在属性名之前，使用#表示。
```javascript
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;
```

## **17. Module**
1. export命令除了输出变量，还可以输出函数或类（class）。通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
2. export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
3. export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错。
4. import命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
5. import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js路径可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。
6. import命令具有提升效果，会提升到整个模块的头部，首先执行。由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
7. 除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
8. 为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。这时import命令后面，不使用大括号。
9. export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能对应一个方法。
10. 因为export default本质是将该命令后面的值，赋给default变量以后再默认，所以直接将一个值写在export default之后。
11. 模块之间也可以继承。ES6 模块加载的机制，与 CommonJS 模块完全不同。CommonJS模块输出的是一个值的拷贝，而 ES6 模块输出的是值的引用。
12. ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
13. 在静态分析阶段，一个模块脚本只要有一行import或export语句，Node 就会认为该脚本为 ES6 模块，否则就为 CommonJS 模块。如果不输出任何接口，但是希望被 Node 认为是 ES6 模块，可以在脚本中加一行语句。export {};上面的命令并不是输出一个空对象，而是不输出任何接口的 ES6 标准写法。
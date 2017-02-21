# JS笔记1（数据类型）

---

## 1. 数据类型及判断
1. 基本数据类型：`string`，`number`，`boolean`，`null`，`undefined`，`symbol`。复杂数据类型：`object`。
2. typeof：返回字符串：`string`，`number`，`boolean`，`object`，`undefined`，`function`。
3. instanceof：判断复杂数据类型。如`[] instanceof Array`。
4. Object.prototype.toString.call(null)：返回`"[object Null]"`。
5. in操作符，类似instanceof。
5. Null的主要用途：
    1. 对象作为变量，参数时初始化。
    2. 垃圾回收机制。
6. 会转换为false的值：false，空字符串，0或**NaN**，null，undefined。

## 2. Number类型
1. 正零与负零(Object.is)，整数小数部分。小数精度问题。NaN(Object.is)。
2. 数值转换：Boolean值转为0/1，**null转为0，undefined转为NaN**，空字符串转为0，对象先调用`valueOf()`，如果为NaN，则调用toString()，`([].toString() => '')（有关数组要谨慎！）`。**一元加操作符与Number转型函数相同（如+new Date/true）**
3.  parseInt()可以指定基数来进行进制转换（**转为十进制**），parseFloat()只解析十进制值。数字转为相应进制：`toString(基数)`。
4. `toFixed()`：将一个数转为指定位数小数的字符串表示。
5. `toPrecision()`：有效数字。（补小数/科学计数）

## 3. String类型
1. `String()`有toString方法则调用，null返回null，undefined返回undefined。**加号操作符与String相同（如true+'')**
2. base64转码：atob()，btoa()。要将非ASCII码字符（如汉字）转为Base64编码：`btoa(encodeURIComponent(str))`，`decodeURIComponent(atob())`。
3. charAt同方括号表示法，charCodeAt，同接收一个参数。返回字符或字符编码/空字符串或NaN。
4. concat同+操作符。
5. `slice(start,end)`：负值与length相加，`substring(start,end)`：大值减小值，`substr(start,length)`：length。
6. indexOf，lastIndexOf。如果指定值只在字符串中出现一次，则两者相等。
7. trim，trimLeft，trimRight。
8. toLowerCase，toUpperCase。
9. localeCompare()，比较两个字符串。
10. String.fromCharCode。

## 4. 操作符
1. */%-: 非数值调用Number()。
2. +: 有字符串，非字符串调用toString或String。
3. <>: 优先数字Number()，后字符串。**NaN与任何值比较均为false**。
4. ==： 优先数字，valueOf。两个都为对象，比较是否为同一个对象(**Boolean，Number，String**)

## 5. 对象
使用new操作符时如果不传参数可以省略圆括号。
### 1. array
1. `valueOf()`：返回该数组。
2. `toString()`：返回有数组中每个值的字符串形式拼接的以逗号分割的字符串。注：**[] => ''，[1] => '1'**
3. `Array.isArray()`。iframe。
4. 不改变原数组：join，concat，slice，迭代方法（fun,this)：every，some（返回boolean），map，filter（返回数组），forEach。indexOf，lastIndexOf（返回index/-1）。reduce，reduceRight((prev,next,index,array),初值).
5. 改变原数组：push，unshift（返回length），pop，shift（返回删除值），splice（返回被删除数组），sort（>0换位置），reverse。


### 2. Data
1. `valueOf()`：毫秒表示。
2. 日期字符串的完整格式是“month day,year hours:minutes:seconds”。如`'June 21, 2015 12:23:14'`。或`year, month[, day, hours, minutes, seconds, ms]`。

### 3. RegExp
1. exec：返回数组，每次只返回一个匹配项（设置g时再次调用返回下一个匹配项），数组第一项为匹配项，后面为捕获组项（用圆括号分割），返回的数组有index和input属性。专门为捕获组设计的。
2. test。
3. 构造函数属性：input($_)，leftContext($&)，rightContext($+)，lastMatch($`)，lastParen($*)，multiline($')。
1. match：返回匹配项数组。
2. serach：返回第一个匹配结果的index/-1。
3. replace：$$($)，$&(lastMatch)，$'(leftContext)，$`(rightContext)，$n，$nn。为函数时参数：匹配项，捕获组。。，index，string。
4. split：第二参数为数组成员个数。

### 4. Function
1. 函数是对象，函数名是指针。
2. 变量提升，函数表达式与函数声明不同点。
3. length：要接收的参数个数。可以用来实现重载。
4. prototype：不可枚举。
5. apply，call非继承而来的方法。
6. **函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。**
7. **闭包的用处，可以读取函数内部的变量，可以使变量始终保持在内存中，即闭包可以使得它诞生环境一直存在，封装对象的私有属性和私有方法。**
8. IIFE：不必为函数命名，避免了污染全局变量；内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。

### 5. 基本包装类型
创建相应的一个实例=>在实例上调用指定的方法=>销毁这个实例。

## 5. JSON
1. JSON.stringify：第二参数为数组，表示要转换的属性。第三参数用来提高可读性。字符串或数字（空格数）。
2. JSON.parse。
3. toJSON方法：当JSON。stringify的参数对象有toJSON方法时会调用此方法。


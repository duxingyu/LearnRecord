# nodejs    

标签（空格分隔）： js

---

## **1. 概述**
1. `REPL环境（Read–eval–print-loop，”读取-求值-输出”循环）`。使用`–use_strict`进入严格模式。特殊变量下划线（_）表示上一个命令的返回结果。
2. 回调函数：Node约定，如果某个函数需要回调函数作为参数，则回调函数是最后一个参数。另外，回调函数本身的第一个参数，约定为上一步传入的错误对象。如果没有发生错误，回调函数的第一个参数就传入null。
3. 模块一旦被加载以后，就会被系统缓存。如果第二次还加载该模块，则会返回缓存中的版本，这意味着模块实际上只会执行一次。如果希望模块执行多次，则可以让模块返回一个函数，然后多次调用该函数。
4. Node是单线程运行环境，一旦抛出的异常没有被捕获，就会引起整个进程的崩溃。异常处理：一般来说，node有三种方法，传播一个错误：
    1. 使用throw语句抛出一个错误对象，即抛出异常。无法捕获异步运行的代码抛出的异常。
    2. 将错误对象传递给回调函数，由回调函数负责发出错误。
    3. 通过EventEmitter接口，发出一个error事件。
5. node脚本可以作为命令行脚本使用。作为命令行脚本时，console.log用于输出内容到标准输出，process.stdin用于读取标准输入，child_process.exec()用于执行一个shell命令。
```javascript
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

emitter.emit('error', new Error('something bad happened'));
emitter.on('error', function(err) {
  console.error('出错：' + err.message);
});
```
### **1. 全局对象和全局变量**
1. `global`
2. `process`：表示Node所处的当前进程。
3. `console`
4. `setTimeout()`
5. `clearTimeout()`
6. `setInterval()`
7. `clearInterval()`
8. `require()`
9. `Buffer()`：用于操作二进制数据。
10. `__filename`
11. `__dirname`
## **2. CommonJS规范**
1. 每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。如果想在多个文件分享变量，必须定义为global对象的属性。
2. 每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。
3. Node内部提供一个Module构建函数。所有模块都是Module的实例。每个模块内部，都有一个module对象，代表当前模块。它有以下属性。
    1. `module.id` 模块的识别符，通常是带有绝对路径的模块文件名。
    2. `module.filename` 模块的文件名，带有绝对路径。
    3. `module.loaded` 返回一个布尔值，表示模块是否已经完成加载。
    4. `module.parent` 返回一个对象，表示调用该模块的模块。
    5. `module.children` 返回一个数组，表示该模块要用到的其他模块。
    6. `module.exports` 表示模块对外输出的值。表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取module.exports变量。
4. exports变量。指向module.exports。`exports = module.exports`。不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系。如果一个模块的对外接口，就是一个单一的值，不能使用exports输出，只能使用module.exports输出。
5. require命令。如果想得到require命令加载的文件绝对路径，使用`require.resolve('')`方法。所有缓存的模块保存在require.cache之中。删除模块缓存：`delete require.cache[module]`。
6. require方法有一个main属性，可以用来判断模块是直接执行，还是被调用执行。`require.main === module`。
7. 加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
## **3. fs**
1. `readFile()+`：1-文件名，2-字符编码或配置对象(`{encoding: null, flag: 'r'}），3-回调（err，data），返回值：/string。不指定编码data及返回值均为Buffer。
2. `writeFile()+`：1-写入文件名，2-写入数据(data)，3-字符编码或配置对象+mode：0o666,flag:w，4-回调（err）。data为buffer时忽略编码。无返回值。如果`file descriptor`作为文件，不会自动关闭，不可读或写。
3. `mkdir()+`：1-path，2-mode（0o777权限值），3-回调（err）。
4. `readdir()+`：1-path，2-字符编码或配置对象（`{encoding:utf8}`），3-回调(err,files)。返回值和files：返回该目录下的文件名数组，编码为buffer返回buffer数组。
5. `stat()+`：1-path，2-回调（err，stats）。返回该文件或目录信息。fs.Stat
6. `access()+`：1-path，2-回调（err）。如果没有后续处理可用来检查文件/目录是否存在。open()/readFile()/writeFile()前不推荐使用。应直接使用err。
7. `createReadStream()`：1-path，2-options。createWriteStream。
8. `watch()`：1-path，2-options/encoding，3-listener（eventType(rename/change)，filename）。
## **1. URL**
1. `url.parse(urlString[, parseQueryString[, slashesDenoteHost]])`：将urlString转为urlObject。参数二为boolean，默认falses，为true将query转为obj形式。参数三解析不完整的url。默认为false。
2. `url.format(urlObject)`：将urlObject转为urlString。
3. `url.resolve(from, to)`。

```javascript
const urlString = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'
url.parse(urlString);
const urlObject = {
  protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',    // {query: 'string'}
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' };
url.resolve('http://example.com/one', '/two') // 'http://example.com/two'
```

## **2. Query String**
1. `querystring`模块提供解析和格式化URL查询字符串的实用工具。
2. `querystring.stringify(obj[, sep[, eq[, options]]])`：sep默认为`&`，eq默认为`=`，options：｛`encodeURIComponent`: ｝是一个对象。
3. `querystring.parse(str[, sep[, eq[, options]]])`：解析，seq和eq为解析方式，options: ｛`decodeURIComponent`，`maxKeys`｝。`maxKeys`：指定要解析的键的最大数目。默认为1000。指定0删除键计数限制。
4. `querystring.escape(str)`：转义。
5. `querystring.unescape(str)`。
```javascript
const obj = {
    name: 'duxy',
    tag: ['man', 'boy'],
    sex: '',
    des: 'Good!'
};
querystring.stringify(obj);     // 'name=duxy&tag=man&tag=boy&sex=&des=Good!'
querystring.stringify(obj,',',':');     // 'name:duxy,tag:man,tag:boy,sex:,des:Good!'
querystring.escape('读写');     // '%E8%AF%BB%E5%86%99'
querystring.unescape('%E8%AF%BB%E5%86%99');     // '读写'
```

## **3. http**
1. `http.METHODS`：arr，支持的http方法。
2. `http.STATUS_CODES`：obj，状态码及简短描述。
3. `http.globalAgent`：Agent作为所有HTTP客户端请求的默认全局实例。
4. `http.createServer([requestListener])`：返回一个新的`http.Server`实例。
5. `http.get(options[, callback])`：大多数请求是没有主体的GET请求，与`http.request()`方法的不同在于自动设置为GET，并调用`http.end()`。但在回调中的response中必须要使用在http.ClientRequest部分。
6. `http.request(options[, callback])`：选项部分可以为字符串或对象。为字符串时默认使用`url.parse()`解析，回调参数为response监听。该方法返回一个`http.ClientRequest`类的实例，是一个可写流：
    1. `protocol`：默认为http:。
    2. `host`：默认为localhost。
    3. `hostname`
    4. `family`：数字，4或6（IPV4/V6)。
    5. `port`：默认为80.
    6. `localAddress`：用于连接网络连接的本地接口。字符串。
    7. `socketPath`
    8. `method`：默认为GET。
    9. `path`：默认为/。
    10. `headers`：请求头。对象。
    11. `auth`
    12. `agent`
    13. `createConnection`
    14. `timeout`

发送一个`Connection: keep-alive`将通知Node.js，连接到服务器应该坚持到下一个请求。
发送`Content-Length`将禁用默认的分块编码。
发送一个`Expect`将立即发送请求头。通常，当发送`Expect: 100-continue`时，您应该设置超时并侦听`continue`事件。
发送Authorization头将使用auth选项覆盖计算基本身份验证。
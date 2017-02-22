# JS笔记2（BOM）

---

## 1. window对象的属性
1. window.top/parent/self。
2. window.frames，window.length，均为frame相关。
3. window.screenX/screenLeft，window.screenY/screenTop。浏览器左上角相对与屏幕。
4. `window.innerHeight/innerWidth`。
5. `window.outerHeight/outerWidth`。
6. `window.pageXOffset/pageYOffset`。滚动距离。

## 2. navigator
window对象的navigator属性，指向一个包含浏览器信息的对象。
1. navigator.userAgent可以大致识别手机浏览器。如判断是否包含'mobi'。
3. navigator.platform。操作系统信息。
4. navigator.onLine，与离线应用存储相关。
5. `navigator.geolocation`。返回一个Geolocation对象，包含用户地理位置的信息。
6. navigator.javaEnabled()，navigator.cookieEnabled只表示浏览器能否存储cookie。

## 3. location
window.location == document.location。
1. href：`http://www.baidu.com:80/signup?a=b&c=d#top`
2. protocol：`http:`
3. host：`www.baidu.com:80`
4. hostname：`www.baidu.com`
5. port：`80`
6. pathname：`/signup`
7. serach：`?a=b&c=d`
8. hash：`#top`
9. assign()：跳转到另一网页，重载页面，有历史记录。设置location.href.../location也会调用该方法。
10. reload()参数为true优先从服务器加载，设为false优先本地缓存。默认为false。
11. replace()应用：当脚本发现当前是移动设备时，就立刻跳转到移动版网页。没有历史记录。

## 4. history
1. `length，go()，back()，forword()。go(0)刷新页面，除此外均为从缓存中加载。`go也可以传递字符串，表示包含该字符串的最近url。
2. history.pushState(state,title,相对url)：执行后，新的状态信息就会被加入历史状态栈，浏览器地址栏也会变为新的相对url，但不会向服务器发送请求，不重新加载页面。
3. ,replaceState(state,title,url)。修改历史记录。同域 限制。
3. state。
4. window.popstate事件。点击前进，后退，调用go，back，forword时调用。只针对同一文档。回调event[.state(同pushState(state))]
5. URLSearchParams为构造函数，用于处理URL之中的查询字符串，即问号之后的部分。实例可以当作POST数据发送，所有数据都会URL编码。
6. window.onhashchange：回调event属性：newUrl，oldUrl。
```javascript
var state = {mes: '你好'};
history.pushState(state, 'title', 'hello?p=name');
window.addEventListener('popstate', e => console.log(e.state));
var query = '?a=b&c=d';
var serach = new URLSearchParams(query);
```

## 5. screen
1. `screen.width，screen.height。设备的分辨率。`
2. screen.colorDepth。
3. screen.availLeft,Width,Height,Top。

## 6. window对象的方法
1. scrollTo(x, y)：指定坐标。scrollBy(left, bottom)：指定距离。（数字）
2. open()（返回浏览器窗口，对象四个参数），close()。
3. `getComputedStyle(dom).css。第二参数为指定节点的伪元素。`chrome可以获取快捷方法如margin。
4. getSelection()。选中文本，返回一个对象。通过调用其toString()方法可获取到该文本。

## 7. Web Notifications API
浏览器的通知接口，用于在用户的桌面显示通知信息。如果网页代码调用这个API，浏览器会询问用户是否接受。只有在用户同意的情况下，通知信息才会显示。
1. Notification.permission属性，用于读取用户给予的权限，它是一个只读属性，它有三种状态。default，granted（同意），denied（拒绝）。
2. Notification.requestPermission()，用于让用户做出选择，是否接收通知。参数是一个回调函数，该函数可以接收用户授权状态作为参数。
3. Notification（title,options）对象作为构造函数使用时，用来生成一条通知。title属性是必须的，用来指定通知的标题，格式为字符串。options属性是可选的，格式为一个对象，用来设定各种设置。
```javascript
Notification.requestPermission(function(status) {
  if (status === "granted") {
    var title = '标题',
      options = {
        body: '这是一条提示，请注意查收！'
      }
    var a = new Notification(title, options);
  }
});
```
## 8. 其他
1. load。
2. error。JavaScript语言错误，JavaScript脚本文件不存在，图像文件不存在时触发。
3. encodeURI()除元字符和语义字符外都转码，encodeURIComponent()除语义字符外都转码。utf-8。
4. decodeURI()，decodeURIComponent()。
5. 设置获取cookie时需要对分号，逗号，空格转义。

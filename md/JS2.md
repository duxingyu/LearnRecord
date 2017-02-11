# JS笔记2

标签（空格分隔）： 未分类

---

## 1. window对象
### 1. window对象的属性
1. window.window === window指向自身。window.name可以用于设置浏览器窗口的名字，iframe。
2. window.location === document.location。保存着URL地址相关信息。是一个对象。
3. window.closed（返回boolean），一般用来检查，使用脚本打开的新窗口是否关闭。window.opener（返回父窗口window/null），通过opener属性，可以获得父窗口的的全局变量和方法，但只限同源。
4. window.frames，window.length，均为frame相关。
5. window.screenX，window.screenY。浏览器左上角相对与屏幕。
6. `window.innerHeight，window.innerWidth`。
7. `window.outerHeight，window.outerWidth`。
8. window.pageXOffset，window.pageYOffset。滚动距离。

### 2. navigator对象
返回包含浏览器信息的对象。为window对象的属性。可以直接获取。还有未列出的。。。
1. navigator.userAgent可以大致识别手机浏览器。如判断是否包含'mobi'。
2. navigator.plugins。返回类数组对象。插件。
3. navigator.platform。操作系统信息。
4. navigator.onLine。
5. `navigator.geolocation`。返回一个Geolocation对象，包含用户地理位置的信息。
6. navigator.javaEnabled()，navigator.cookieEnabled只表示浏览器能否存储cookie。

### 3. window.screen对象
该对象包含了显示设备的信息。为window对象的属性。还有未列出的。。。
1. `screen.width，screen.height。设备的分辨率。`
2. screen.colorDepth。
3. screen.availLeft,Width,Height,Top。

### 4. window对象的方法
1. moveTo()，moveBy()，可能被禁用。
2. scrollTo()，scrollBy()。指定位置，指定距离。
3. open()（返回浏览器窗口，对象四个参数），close()。
4. print()，跳出打印对话框。
5. `getComputedStyle(dom).css。第二参数为指定节点的伪元素。chrome可以获取快捷方法，其他未知。。。`
6. matchMedia()。
7. focus()。
8. getSelection()。选中文本。通过调用其toString()方法可获取到该文本。

### 5. 其他
#### 1. 事件
1. load。
2. error。JavaScript语言错误，JavaScript脚本文件不存在，图像文件不存在时触发。回调函数接收5个参数等等。。。

#### 2. 多窗口frame
#### 3. URI编码，解码
1. encodeURI()除元字符和语义字符外都转码，encodeURIComponent()除语义字符外都转码。utf-8。
2. decodeURI()，decodeURIComponent()
3. 设置获取cookie时需要对分号，逗号，空格转义。

#### 4. alert()，prompt()，confirm()
具有堵塞效应。一旦弹出对话框，整个页面就是暂停执行，等待用户做出反应。

#### 5. history对象
1. `length，go()，back()，forword()。go(0)刷新页面，除此外均为从缓存中加载。`
2. pushState(state,title,url),replaceState(state,title,url)。添加和修改历史记录。同域 限制。
3. state。
4. popState事件。点击前进，后退，调用go，back，forword时调用。只针对同一文档。回调event[.state]
5. URLSearchParams为构造函数，用于处理URL之中的查询字符串，即问号之后的部分。实例可以当作POST数据发送，所有数据都会URL编码。有一些方法。。。

#### 6. Cookie
一般不能超过4KB。
可通过`document.cookie`设置cookie。一次设置一个。为添加操作。值为value[; expires=date][; domain=domain][; path=path][; secure]，value为键值对，通过=相连。expires指定过期时间。格式采用Date.toUTCString()的格式（`date.toGMTString()`）。domain，path，secure用来指定https，max-age指定cookie有效期，单位为秒。HttpOnly也为属性。 有同域限制。  

## 2. Web Storage
为window的属性。同域限制。几兆。
1. 该API的作用是，使得网页可以在浏览器端储存数据。它分成两类：sessionStorage和localStorage。两者保存期限不同。
2. 以“键值对”的形式存在。每一项数据都有一个键名和对应的值。所有的数据都是以文本格式保存。
3. setItem存入数据。getItem取出数据。removeItem清除数据，clear()清除所有数据。如：`sessionStorage.getItem('key')`。
4. 遍历：length属性，key(n)。如：`localStorage.key(0)`。
5. storage事件，当储存的数据发生变化时触发。回调接收一个参数，event，包括key，oldValue（新增加为null），newValue（被删除为null），url。该事件不在导致数据变化的当前页面触发，打开同域下多个页面时，在其他页面触发，可实现多窗口通信。

## 3.  同源政策
协议相同，端口相同，域名相同。
1. 限制范围：ajax，cookie，dom，localStorage，IndexedDB。
2. cookie：设置`document.domain`共享。同一一级域名。设置cookie时指定域名。
3. iframe：片段标识符，跨文档通信API：window.postMessage()（也适用于localStorage）。
4. ajax：JSONP，CORS（跨源资源共享），Web Socket

## 4. ajax
步骤：创建ajax对象，发出HTTP请求，接收服务器传来的数据，更新网页数据。
### 1. XMLHttpRequest实例属性
1. readyState：只读，0=unsend,1=opened,2=headers_received,3=loading,4=done。值每一次变化，触发readyStateChange事件。
2. onreadyStateChange属性指向一个回调。
3. response：只读，接收到的数据体。类型可以是ArrayBuffer、Blob、Document、JSON对象、或者一个字符串。不成功或数据不完整为null。
4. responsetype：指定服务器返回数据类型：‘’（默认字符串），JSON，Blob，ArrayBuffer，document，text（字符串）。
5. responseText：返回从服务器接收到的字符串/null。
6. responseXML。
7. status。
8. statusText。
9. timeout。等待时间。可以设置，毫秒。
10. 事件监听接口：第一版为onreadyStateChange，第二版新增onloadstart，onprogress，onabort，onerror，onload，ontimeout，onloadend。
11. withCredentials。CORS发送cookie。
12. upload：有一个progress属性，返回上传进度。onprogress在upload上调用。

### 2. XMLHttpRequest实例方法
1. abort()：终止发出的请求。
2. getAllResponseHeaders()：返回服务器发来的所有HTTP头信息。
3. getResponseHeader()：指定头信息。
4. open()：method，url，async，username，password。
5. setRequestHeader()：open之后，send之前。多次调用会合并。
6. send()：参数为data。所有XMLHttpRequest的监听事件，都必须在send()方法调用之前设定。
7. overrideMimeType()：用来指定服务器返回数据的MIME类型，一般采用responseType来指定。

## 5. Fetch API
用来取代XMLHttpRequest。它主要有两个特点，一是接口合理化，二是Fetch操作返回Promise对象，避免了嵌套的回调函数。数据传送是以数据流（stream）的形式进行的。
1. fetch()：第一参数为url/Request对象实例。返回Promise对象。并将response对象传给回调。response：ok，type（basic，cors，opaque），url，status，statusText，headers。第二参数为对象：cors模式需要指定`mode: cors`，method，headers，body。
2. Headers构造函数。用来构造/读取HTTP数据包的头信息。可使用append方法添加属性，也可以向构造函数中传入对象。生成的实例可传入Request和Response中。
3. Request构造函数。用来构造HTTP请求。。。。。
4. Response构造函数。。。。。

## 6. IndexedDB
浏览器端数据库，可以被网页脚本程序创建和操作。
特点：键值对存储，异步，支持事务，同域限制，储存空间大，支持二进制存储。
1. indexedDB.open(name,version)：打开或新建数据库。返回一个对象，可能触发4种事件。success，error，upgradeneeded，blocked，回调接收一个参数event，event.target.result即为数据库。
2. createObjectStore()：用于创建存放数据的“对象仓库”（object store）。第一参数为名字，第二参数可选，用来设置其属性。
3. objectStoreNames，返回一个DOMStringList对象，里面包含了当前数据库所有“对象仓库”的名称。可以使用DOMStringList对象的contains方法，检查数据库是否包含某个“对象仓库”。
4. transaction方法用于创建一个数据库事务。向数据库添加数据之前，必须先创建数据库事务。
5. createIndex方法用于创建索引。
6. IDBKeyRange对象的作用是生成一个表示范围的Range对象。

## 7. Web Notifications API
浏览器的通知接口，用于在用户的桌面（而不是网页上）显示通知信息。如果网页代码调用这个API，浏览器会询问用户是否接受。只有在用户同意的情况下，通知信息才会显示。
1. Notification.permission属性，用于读取用户给予的权限，它是一个只读属性，它有三种状态。default，granted（同意），denied（拒绝）。
2. Notification.requestPermission()，用于让用户做出选择，是否接收通知。参数是一个回调函数，该函数可以接收用户授权状态作为参数。
3. Notification（title,options）对象作为构造函数使用时，用来生成一条通知。title属性是必须的，用来指定通知的标题，格式为字符串。options属性是可选的，格式为一个对象，用来设定各种设置。

## 8. Performance API



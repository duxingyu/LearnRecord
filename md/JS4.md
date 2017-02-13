# JS笔记4

标签（空格分隔）： 未分类

---

## 1. 定时器
1. **允许添加更多的参数。它们将被传入回调函数。IE9及以下不兼容。**解决方法：匿名函数中传入回调。使用bind(undefined,...)。
2. **如果回调函数是某个对象的方法，那么该方法中的this关键字将指向全局环境，而不是定义时所在的那个对象。使用obj.fn.bind(obj)。匿名函数传入回调。**
3. **返回一个整数，表示定时器的编号**，以后可以用来取消这个定时器。
4. 如果网页不在浏览器的当前窗口（或tab），许多浏览器限制setInteral指定的反复运行的任务最多**每秒执行一次**。
5. **setInterval指定的是“开始执行”之间的间隔，并不考虑每次任务执行本身所消耗的时间。解决方法：使用setTimeout**
6. setTimeout和setInterval返回的整数值是连续的。
7. **将要推迟执行的代码都放在一个函数里，然后只对这个函数使用setTimeout或setInterval，提高性能。**
8. **setTimeout(f,0)：调整事件执行顺序。应用：用户自定义的回调函数，通常在浏览器的默认动作之前触发（输入文本，keypress事件会在浏览器接收文本之前触发）。计算量大，耗时任务执行。**
9. **正常任务在下一轮事件轮询中执行（setTimeout，setInterval，setImmediate，I/O，事件回调），微任务在此轮最后执行（Promise，progress.nextTick）。**

## 2. 网页中的API
1. 历史原因，**HTML元素的id属性的名字，会自动成为全局变量，指向该HTML元素。如果已有同名全局变量，则id元素不会自动生成全局变量。默认的全局变量名最好不要设为ID**
2. 历史原因，applet，area，embed，form，frame，frameset，iframe，img，object的name属性，也会成为全局变量。若同名元素有多个，这些全局变量会指向一个类数组对象。这些元素的name属性名，也会成为document对象的属性。

## 3. 文件和二进制操作
### 1. Blob对象
1. Blob（Binary Large Object）对象代表了一段二进制数据，提供了一系列操作接口。
2. 生成Blob对象方法1：使用Blob构造函数。接受两个参数。第一个参数是一个包含实际数据的数组，第二个参数是数据的类型`{type:..}`，这两个参数都不是必需的。
3. 方法2：对现有的Blob对象使用slice方法切出一部分。将二进制数据按照字节分块，返回一个新的Blob对象。
4. Blob两个只读属性：type，size。

### 2. FileList对象
FileList对象针对表单的file控件。
### 3. File API
是FileList对象的成员，包含了文件的一些元信息，name，type，size，lastModified，lastModifiedDate。
### 4. FileReader API
1. 用于读取文件，即把文件内容读入内存。它的参数是File对象或Blob对象。
2. readAsBinaryString(Blob|File)，readAsText(Blob|File, opt_encoding)，readAsDataURL(Blob|File)，readAsArrayBuffer(Blob|File)。
3. 采取异步方式。onload，onabort。。。

### 5. URL对象
用于生成指向File对象或Blob对象的URL。

## 4. Web Worker
1. 分类：普通的Worker：只能与创造它们的主进程通信，Shared Worker：能被所有同源的进程获取，必须通过一个端口通信，ServiceWorker：实际上是一个在网络应用与浏览器或网络层之间的代理层。它可以拦截网络请求，使得离线访问成为可能。
2. 特点：同域限制。DOM限制（document，window，parent）。脚本限制（无法读取全局变量，函数，可以执行setTimeout，setInterval，XMLHttpRequest）。文件限制（无法读取本地文件）。
3. 采用new构造函数新建子进程，参数是一个脚本文件。新建后，调用postMessage()启动，参数为对象或字符串。只要符合父线程的同源政策，Worker线程自己也能新建Worker线程。
4. 在子线程内，必须有一个回调函数，监听message事件。self代表子线程自身，event.data代表主线程发来的信号，self.postMessage则表示，子线程向主线程发送一个信号。根据主线程发来的不同的信号值，子线程可以调用不同的方法。主线程也必须指定message事件的回调函数，监听子线程发来的信号，如果发生错误，会触发主线程的error事件。
5. 使用完毕之后，为了节省系统资源，我们必须在主线程调用terminate方法，手动关闭子线程。worker.terminate()或子线程关闭自身self.close()。
6. 通信过程通信是拷贝关系，即是传值而不是传址。之间也可以交换二进制数据。

## 5. SSE：服务器发送事件
浏览器向服务器发送一个HTTP请求，然后服务器不断单向地向浏览器推送“信息”。
1. 特点：1. 单向通道，只能服务器向浏览器端发送。2. 部署在HTTP协议之上的，现有的服务器软件都支持。3. 轻量级协议，相对简单，4. 默认支持断线重连，5. 支持自定义发送的数据类型。
2. 建立连接：new EventSource(url)，同域限制。实例对象属性readyState：0：连接还未建立，或者连接断线。1：表示连接已经建立，可以接受数据。2：表示连接已断，且不会重连。
3. open事件：连接建立，触发，调用回调。
4. message事件：收到数据触发。event.data（文本格式），origin（服务器端URL域名部分），lastEventId（数据编号）。
5. error事件。
6. 自定义事件。这种情况下，发送回来的数据不会触发message事件。
7. close()：关闭连接。

## 6. Page Visibility API
用于判断页面是否处于浏览器的当前窗口，即是否可见。
部署在document上，两个属性：document.hidden，document.visibilityState。变化时触发visibilitychange事件。

## 7. Fullscreen API：全屏操作
该操作方法，属性均需前缀。
1. Element节点的requestFullscreen方法，可以使得这个节点全屏。需要前缀。
2. 放大一个节点时，Firefox和Chrome在行为上略有不同。Firefox自动为该节点增加一条CSS规则，将该元素放大至全屏状态，width: 100%; height: 100%，而Chrome则是将该节点放在屏幕的中央，保持原来大小，其他部分变黑。为了让Chrome的行为与Firefox保持一致，可以自定义一条CSS规则。
3. document对象的exitFullscreen方法用于取消全屏。该方法也带有浏览器前缀。按下ESC，F11也会退出全屏。
4. document.fullscreenElement返回正处于全屏状态的Element节点，如果当前没有节点处于全屏状态，则返回null。
5. document.fullscreenEnabled属性返回一个布尔值，表示当前文档是否可以切换到全屏状态。
6. fullscreenchange，fullscreenerror事件。
7. 全屏状态下，大多数浏览器的CSS支持:full-screen伪类，只有IE11支持:fullscreen伪类。使用这个伪类，可以对全屏状态设置单独的CSS属性。前缀。

## 8. requestAnimationFrame
1. 浏览器用于定时循环操作的一个接口，类似于setTimeout，主要用途是按帧对网页进行重绘。
2. 目的是为了让各种网页动画效果（DOM动画、Canvas动画、SVG动画、WebGL动画）能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。优势在于充分利用显示器的刷新机制，比较节省系统资源。一旦页面不处于浏览器的当前标签，就会自动停止刷新。
3. requestAnimationFrame是在主线程上完成。使用一个回调函数作为参数。这个回调函数会在浏览器重绘之前调用。使用requestAnimationFrame的时候，只需反复调用它即可（递归）。
4. cancelAnimationFrame方法用于取消重绘。参数是requestAnimationFrame返回的一个代表任务ID的整数值。

## 9. Web Socket
主要作用是允许服务器端与客户端进行全双工（full-duplex）的通信。WebSocket协议完全可以取代Ajax方法，用来向服务器端发送文本和二进制数据，而且还没有“同域限制”。
1. 建立连接：new WebSocket('ws/wss://..')。建立连接后实例对象属性readyState：0：正在连接，1：连接成功，2：正在关闭，3：连接关闭。open，close事件。
2. 连接建立后，客户端通过send方法向服务器端发送数据。除了发送字符串，也可以使用 Blob 或 ArrayBuffer 对象发送二进制数据。
3. 客户端收到服务器发送的数据，会触发message事件。该对象的data属性包含了服务器返回的数据。如果接收的是二进制数据，需要将连接对象的格式设为blob或arraybuffer。
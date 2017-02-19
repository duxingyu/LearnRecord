# JS笔记3（DOM）

标签（空格分隔）： 未分类

---

## 1. DOM模型
节点类型：Document，DocumentType(`<! DOCTYPE html>`)，Attribute，Element，Text，Comment，DocumentFragment。
### 1. 特性相关的属性
1. Node.nodeName(tagName)，Node.nodeType。
3. **Node.textContent**：返回当前节点和它的所有后代节点的文本内容。Text，Comment与nodeValue相同，读取整个文档：`document.documentElement.textContent`。
3. Node.baseURI：返回一个字符串，表示当前网页的绝对路径/null。可以使用HTML的`<base>`标签，改变该属性的值。只读。

### 2. 相关节点的属性
1. Node.ownerDocument：返回当前节点所在的顶层文档对象，即document对象。
2. Node.nextSibling，Node.previousSibling。
3. **Node.parentNode，Node.parenteElement。**
4. Node.childNodes：是一个动态集合。Node.firstChild，Node.lastChild。

### 3. 节点对象的方法
1. **Node.appendChild()，Node.insertBefore()，Node.removeChild()，Node.replaceChild()。分别返回添加，插入，移除，被替换的节点。**
2. **Node.hasChildNodes()是否拥有子节点。**
3. **Node.cloneNode()。参数为true，表示是否要克隆子节点。事件不会被克隆。**
4. Node.contains()，Node.isEqualNode()，Node.normalize()。

### 4. NodeList对象，HTMLCollection对象
#### 1. **NodeList对象**
NodeList实例对象是一个类似数组的对象，它的成员是节点对象。可能是动态集合，也可能是静态集合。
#### 2. **HTMLCollection对象**
节点的集合，返回一个类似数组的对象。实例对象的成员只能是**Element节点，都是动态集合，可以用id属性或name属性引用节点元素**，实例的item方法，可以根据成员的位置参数（从0开始），返回该成员。如`document.forms/links/images/embeds/anchors`

### 5. ParentNode接口，ChildNode接口
#### 1. **ParentNode接口**
**用于获取Element子节点。Element节点**、Document节点和DocumentFragment节点，部署了ParentNode接口。
1. **children：返回一个动态的HTMLCollection集合。
2. firstElementChild。
3. lastElementChild。
4. childElementCount。**

#### 2. **ChildNode接口**
**用于处理子节点，Element节点**、DocumentType节点和CharacterData接口，部署了ChildNode接口。
1. **remove()：移除当前节点。
2. before()：参数在该元素前。
3. after()：参数在该元素之后。
4. replaceWith()：被取代。**

## 2. document节点
1. document.doctype(`<!DOCTYPE html>`，**document.documentElement(`html`)**.
2. document.body/head/title/**referrer（当前文档访问来源）/URL/domain（可以设置，跨域）**。
3. document.activeElement返回当前文档中获得焦点的那个元素。
4. document.forms/images/embeds/links/scripts（`HTMLCollection`）/styleSheets。
9. document.readyState：loading（加载HTML代码阶段尚未完成解析），interactive（加载外部资源阶段时），complete。
10. **document.designMode：控制文档能否编辑，值为on/off。**
11. document.implementation.hasFeature()，判断浏览器部署了哪些接口。
12. **document.compatMode：返回浏览器处理文档的模式，可能的值为BackCompat（向后兼容模式）和CSS1Compat（严格模式）。**
13. **document.cookie。**
14. document.open()/close()/write()/writeln()。
15. document.querySelector()/querySelectorAll()，不支持伪元素，NodeList集合，性能弱点，**为静态方法。元素节点上也可调用。**
16. document.getElementsByTagName()，为HTMLCollection集合。
17. document.getElementsByName()，NodeList集合。
18. document.getElementById()。
19. document.elementFromPoint()，参数为坐标，最上层元素。
20. **document.createElement()/createTextNode()/createAttribute(属性名)/createDocumentFragment()。**
21. document.createEvent(),该对象可以被element.dispatchEvent方法使用，触发指定事件。document.addEventListener()/removeEventListener()/dispatchEvent()。
22. document.createNodeIterator()遍历子节点/createTreeWalker()遍历子树。
23. document.document.hasFocus()。

## 3. Element节点
1. attributes/id/tagName(大写）。
2. **innerHTML/outerHTML。**
3. **className/classList：add(,)/remove()/contains()/toggle(第二参数为boolean)/item()/toString()。**
4. **clientWidth/clientHeight：获取整个网页使用documentElement,body返回整个。`+padding`。clientLeft/clientTop边框宽度。**
5. **scrollWidth/scrollHeight。整个网页documentElement/body。`+padding`。scrollLeft/scrollTop（`body`）。**
6. **offsetWidth/offsetHeight。整个网页documentElement/body。`+padding+border`。offsetLeft/offsetTop。**
7. ParentNode接口属性，nextElementSibling，preventElementSibling。focus()。
8. **offsetParent定位父级/body，closest()。**
9. match(选择器)，带有浏览器前缀。
10. **scrollIntoView()：滚动当前元素，进入浏览器的可见区域。接受一个参数boolean，顶部对齐、尾部对齐。**
11. **getBoundingClientRect()：返回一个对象，该对象提供当前元素节点的大小、位置等信息，基本上就是CSS盒状模型提供的所有信息。如`x/y/top/left/bottom/right（均为坐标）/width/height`。把border算作元素的一部分，都是从边框外缘的各个点来计算。**
12. getClientRects()：返回一个类似数组的对象，里面是当前元素在页面上形成的所有矩形。
13. insertAdjacentHTML()：解析HTML字符串，然后将生成的节点插入DOM树的指定位置。接受两个参数，第一个是指定位置（beforebegin/beforeend/afterbegin/afterend），第二个是待解析的字符串。

## 3. 属性操作
1. element.attributes。
2. getAttribute()。
3. setAttribute()。
4. removeAttribute()。
5. hasAttribute()。
6. 保留字：class => className，for => htmlFor。
7. **dataset属性。删除一个data-*属性，可以直接使用delete命令。**

## 4. **DocumentFragment节点**
1. 代表一个文档的片段，本身就是一个完整的DOM树形结构。不属于当前文档，操作DocumentFragment节点，**要比直接操作DOM树快得多**。一般用于构建一个DOM结构，然后插入当前文档。
2. document.createDocumentFragment方法，以及浏览器原生的DocumentFragment构造函数，可以创建一个空的DocumentFragment节点。
3. DocumentFragment节点本身不能被插入当前文档。一旦DocumentFragment节点被添加进当前文档，它自身就变成了空节点，可以被再次使用。
4. 属性和方法全部继承自Node节点和ParentNode接口。

## 5. 事件模型
### 1. EventTarget接口
1. DOM的事件操作（监听和触发），都定义在EventTarget接口。Element节点、document节点和window对象，都部署了这个接口。该接口就是三个方法。
2. addEventListener()：第三参数可以不写。为同一个事件多次添加同一个监听函数，该函数只会执行一次。函数按照添加顺序触发。
3. removeEventListener()。
4. **dispatchEvent()：参数是一个Event对象的实例，返回boolean，是否调用了Event.preventDefault()。**

### 2. 事件传播
1. 事件捕获阶段。**div-body-html-document-window**
2. 处于目标阶段。
3. 事件冒泡阶段。
4. 事件委托。

### 3. Event对象
1. Event构造函数接受两个参数。第一个参数是字符串，表示事件的名称；第二个参数是一个对象，表示事件对象的配置。可以有以下两个属性。bubbles：boolean，默认为false。cancelable：默认为false。
2. event.bubbles：只读属性，event.eventPhase：返回一个整数值，表示事件目前所处的节点。0（未发生），1（捕获），2（目标），3（冒泡）。
3. event.cancelable：只读属性，event.defaultPrevented：是否调用过preventDefault方法。
4. **event.currentTarget：监听函数所绑定的节点（this），event.target。event.relatedTarget**
5. event.type，**event.detail**：返回一个数值，如鼠标事件点击次数，event.timeStamp：毫秒时间戳，发生时间，event.isTrusted：是否为真实事件触发。
6. **event.preventDefault()：阻止默认行为。不会阻止事件的进一步传播，return false目测使用on方式才有效，add无效**
7. **event.stopPropagation()。阻止事件在DOM中继续传播。**
8. **event.stopImmediatePropagation()：除阻止事件继续传播外，阻止同一个事件的其他监听函数被调用。如多个click事件**

### 4. 自定义事件
Event构造函数只能指定事件名，不能在事件上绑定数据。
1. CustomEvent()：可以传入指定的数据。
2. 事件模拟：需要在脚本中模拟触发某种类型的事件，这时就必须使用这种事件的构造函数。

## 6. 事件种类
### 1. 鼠标事件
1. click，dblclick。事件发生顺序：mousedown => mouseup => click。（click在按下回车键时也触发）
2. mousedown，mouseup，mousemove。
3. **mouseenter：事件只触发一次。不冒泡。而只要鼠标在节点内部移动，mouseover事件会在子节点上触发多次。mouseout，mouseleave。关于事件冒泡有点问题**
4. contextmenu。
5. 鼠标事件使用MouseEvent对象表示，它继承UIEvent对象和Event对象。
6. event对象属性：**altKey，ctrlKey，metaKey，shiftKey，button，buttons，clientX，clientY，movementX，movementY，screenX，screenY，pageX，pageY**，relatedTarget属性返回事件的次要相关节点。
7. wheel：鼠标滚轮事件。继承了MouseEvent、UIEvent、Event的属性，以及deltaX，deltaY，deltaZ，deltaMode。WheelEvent构造函数。
8. 键盘事件：keyup，keydown，keypress，key，textInput。

### 2. 进度事件
1. XMLHttpRequest对象发出的HTTP请求的过程、<img>、<audio>、<video>、<style>、<link>加载外部资源过程。下载和上传都会发生进度事件。
2. abort，error，load（成功），loadstart，loadend（进度停止时，发生顺序排在error/abort/load之后），progress（不断触发），timeout。

### 3. 拖拽事件
1. 需要将该节点的draggable属性设为true。一旦某个Element节点的draggable属性设为true，就无法再用鼠标选中该节点内部的文字或子节点了。
2. drag，dragstart，dragend，dragenter，dragover，dragleave，drop。
3. 拖拉过程只触发以上这些拖拉事件，尽管鼠标在移动，但是鼠标事件不会触发。
4. 将文件从操作系统拖拉进浏览器，不会触发dragStart和dragend事件。
5. dragenter和dragover事件的监听函数，用来指定可以放下（drop）拖拉的数据。这两个事件的默认设置为当前节点不允许drop。如果想要在目标节点上drop拖拉的数据，首先必须阻止这两个事件的默认行为，或者取消这两个事件。
6. 所有的拖拉事件都有一个dataTransfer属性，用来保存需要传递的数据。这个属性的值是一个DataTransfer对象。拖拉的数据保存着数据的格式（MIME字符串）和数据的值（字符串）。
7. DataTransfer对象属性：dropEffect：设置drop被拖拉节点时的效果（copy/move/link/none）。effectAllowed：设置本次拖拉中允许的效果（.....），files，types，setData()，。。。。

### 4. 触摸事件
1. 触摸API由三个对象组成：Touch，TouchList，TouchEvent。
2. 很多时候，触摸事件和鼠标事件同时触发，即使这个时候并没有用到鼠标。

#### 1. Touch对象
1. Touch对象，代表一个触摸点。
2. identifier：表示Touch实例的独一无二的识别符，它在整个触摸过程中保持不变。
3. screenX，screenY（相对于屏幕），clientX，clientY（相对于浏览器视口），pageX，pageY（相对于当前页面）。
4. radiusX，radiusY（返回触摸点周围受到影响的椭圆范围的X轴和Y轴，单位为像素。），rotationAngle（触摸区域的椭圆的旋转角度，单位为度数，在0到90度之间）。共同定义了用户与屏幕接触的区域。
5. force：返回一个0到1之间的数值，表示触摸压力。
6. target：返回一个Element节点，代表触摸发生的那个节点。

#### 2. TouchList对象
1. 类似数组的对象，成员是与某个触摸事件相关的所有触摸点。每根手指对应一个Touch对象。
2. length：返回TouchList对象的成员数量。
3. identifiedTouch方法和item方法，分别使用id属性和索引值（从0开始）作为参数，取出指定的Touch对象。

#### 3. TouchEventd对象
1. 键盘相关：alt、shift、ctrl、meta。
2. changedTouches：返回一个TouchList对象，包含了由当前触摸事件引发的所有Touch对象。对于touchstart事件，它代表被激活的触摸点；对于touchmove事件，代表发生变化的触摸点；对于touchend事件，代表消失的触摸点。
3. targetTouches：返回一个TouchList对象，包含了触摸的目标Element节点内部，所有仍然处于活动状态的触摸点。
4. touches：返回一个TouchList对象，包含了所有仍然处于活动状态的触摸点。

#### 4. 触摸事件种类
1. 触摸引发的事件，可以通过TouchEvent.type属性获取到。
2. touchstart。
3. touchend。
4. touchmove。
5. touchcancel。

### 5. 表单，焦点事件
1. **input（连续触发），select（选中文本），change。**
2. reset，**submit（发生对象为form，而非button，input）**。
3. **focus，blur（不冒泡），focusin，focusout（冒泡，兼容性）**。

### 6. 文档事件
1. beforeunload：用来防止用户不小心关闭网页（有兼容性问题）。PC端：**设置event.returnValue为非空字符串**。unload，load，error，pageshow，pagehide。（`window`）
2. DOMContentLoaded，readystatechange（`document`），ie8不支持前者。
3. **scroll，resize（`window`）。scroll，resize事件会连续地大量触发，所以它的监听函数之中不应该有非常耗费计算的操作。推荐的做法是使用requestAnimationFrame或setTimeout控制该事件的触发频率，然后可以结合customEvent抛出一个新事件。**
4. hashchange，popstate（`window`）。
5. cut，paste，copy。都有一个clipboardData只读属性。该属性存放剪贴的数据，是一个DataTransfer对象。

## 7. CSS操作
1. CSS的过渡效果（transition）结束后，触发transitionEnd事件。
2. animationstart事件，animationend事件，animationiteration事件。
3. **cssText：为style的属性，改变行间样式。**
4. **window.getComputedStyle().style。第二参数为伪类。**

## 8. Mutation Observer
1. Mutation Observer（变动观察器）是监视DOM变动的接口。事件为同步触发，而其为异步触发，要等到当前所有DOM操作都结束后才触发。
2. 观察器的回调函数会在每次DOM发生变动后调用。它接受两个参数，第一个是变动数组，第二个是观察器实例。
3. 实例方法observe()：指定所要观察的DOM节点，以及所要观察的特定变动。
4. disconnect()停止观察，takeRecords()清除变动记录。
5. MutationRecord对象。。。
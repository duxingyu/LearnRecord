# jQuery API

标签（空格分隔）： js

---

```javascript
.add() // 返回集合同一文档按先后顺序排列，参数可为html
.addBack()  // 可选一个参数，selector，对其进行过滤
.addClass() // fun(i,currentClass)
.after()  //  content[,content],fun(i)可以同时插入多个元素
.animate()  //  {}[,duration][,easing(swing/linear)][,complete]
.append()  //  fun(i,html)
.appendTo()
.attr() //   {},(attr,fun(i,attr))当设置样式名（“class”）属性时，必须使用引号！
.before()
.blur()     // 此事件不支持冒泡
.change()     // 仅限用于<input>元素，<textarea>和<select>元素.对于下拉选择框，复选框和单选按钮，当用户用鼠标作出选择，该事件立即触发
.children()     // 不返回文本节点,只针对子节点，可选参数，selector，过滤
.clearQueue()   //  
.click()    
.clone()    // 可能产生id属性重复的元素的副作用,两个可选参数，默认false，事件，数据
.closest()  // 可能含该元素，返回0~1个,可选上下文
.contents() // 子节点，包含非元素节点，如果iframe是在与主页同域，.contents()方法也可用于获取iframe中的文件内容。
.css()  // 设置为'',可清除行间样式,但(prop,fun(i,val))可以遍历
.data() // 暂不清楚
.dblclick() 
.delay()    // 只有队列中连续的事件会延迟,在animate前，不带参数的show()/hide()不起作用。无法取消延时——.delay()，它不是JavaScript的原生 setTimeout函数的替代品
.dequeue()  // 执行匹配元素队列的下一个函数
.detach()   
.each()
.empty()    // 清除所有子元素，包含文本节点等
.end()      // 返回上一个
.eq()       // 可为负数，倒数
.fadeIn(显示)/fadeOut()
.fadeTo()   // (duration,opacity[,easing][,fun])
.fadeToggle()   //(dur/eas/fun)
.filter()   // (fun(i)
.find()     // 同选择上下文
.finish()   // 完成动画
.first()    
.focus()
.focusin()/.focusout()  // 支持事件冒泡，可以通过父元素检测
.get()  // 可为负数
.has()  // 筛选
.hasClass()     // true/false
.height()   // 当一个元素的高度需要数学计算的时候推荐使用,当元素为absolute和display：block时不准,当改值时有border-box时+padding
.hide()
.hover()    // enter/leave 
.html()     // fun(i,oldHtml)
.innerHeight()/.innerWidth()  //   content+padding
.index()    // ele/dom   没有返回-1
.insertAfter()/.insertBefore()
.is()   //  fun(i)
.jquery     // 可查看版本号$.fn.jquery
.keydown()/.keypress()/.keyup()
.last()
.length 
.map()      // fun(i,domE)
.mouse()
.next()/.nextAll()     // 加参数进行筛选
.nextUntil()    // 截至元素，过滤元素（含）
.not()  // fun(i)
.off()  
.offset()   // left/top/  {left:n,top:n}
.offsetParent() // 定位父级
.on()   
.one()
.outerWidth()/.outerHeight()    // +border/true+margin
.parent()/.parents()
.parentUntil()  // 同上
.position() 
.prepend()/.prependTo()
.prev()/.prevAll()/.prevUntil()
.promise()          // 返回一个 Promise 对象，用来观察当某种类型的所有行动绑定到集合，排队与否还是已经完成。 [type][,target]
.prop()     // {}/fun(i,old)
.pushStack()        // 不懂
.queue()    //  当使用.queue()添加一个函数的时候，我们应该保证在函数最后调用了jQuery.dequeue()，这样就能让队列中的其它函数按顺序执行。2.向队列中追加函数时，可以向该函数中传入另一个函数，作为第一个参数。当调用函数时，会自动从函数队列中弹出下一个项目，保证队列中函数的继续进行。(fun(next){...next()}
$("div").queue("fx", []);
$("div").stop();
.ready()
.remove()
.removeAttr()
.removeClass()
.removeData()
.removeProp()   //  不要使用此方法来删除原生的属性（ property ）
.replaceAll()   // new.(old)
.replaceWith()
.resize()
.scroll()
.scrollTop()/Left()     // 一个可选参数
.select()
.show()
.siblings()     // 一个可选参数，筛选
.slice()        // start[,end]
.slideDown()/Up()/Toggle()   // 下滑
.stop()     // true(后续不再运行),true(立即跳到结束)
.submit()
.text()     // fun(i,text)
.toArray()
.toggle()   // 显示/隐藏
.toggleClass()  // 二参true为添加，false为移除
.trigger()
.triggerHandler()    // 不会触发事件的默认行为,仅影响第一个匹配到的元素,不会在 DOM 树中向上冒泡, 返回最后一个处理的事件的返回值。
.unwrap()   // 删除父级元素
.val()  // fun(i,val)
.width()
.wrap()     // fun(i)
.wrapAll()
.wrapInner()
ev.currentTarget  // ===this
ev.data 		
ev.delegateTarget  // 事件委托的元素on前
ev.isDefaultPrevented()/ev.isImmediatePropagationStopped()/ev.isPropagationStopped()
ev.metaKey 	// true/false
ev.namespace
ev.pageX/pageY
ev.preventDefault()
ev.relatedTarget 	// mouseover/out
ev.result 		// 返回值
ev.stopImmediatePropagation()
ev.stopPropagation()
ev.target
ev.timeStamp
ev.type
ev.which
$.Callbacks() 	// 回调对象
$.Deferred() 	// 延迟对象
$.ajax() 		// 
$.contains() 	// 父元素，子元素 返回boolean
$.cssHooks
$.cssNumber
$.data()
$.dequeue()
$.each() 	// obj,fun(i,val)
$.error()
$.extend()
$.fn.extend()
$.fx.interval 	// 动画频率
$.fx.off 		// 全局禁用动画
$.get()
$.getJSON()
$.geteScript()
$.globalEval()
$.grep() 	// arr过滤，arr,fun(el,i),invert
$.hasData()
$.holdReady()
$.inArray() 	//arrIndexOf(val,arr,index)
$.isArray()
$.makeArray() 	// 转换类数组为数组
$.map()
$.merge() 	// 合并数组到第一个
$.noConflict()
$.now() 	// 返回当前时间
$.proxy()
$.trim()
$.type()
```
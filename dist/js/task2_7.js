"use strict";function renderQueue(e){oData.innerHTML="";for(var t=0;t<queue.length;t++){var u=document.createElement("li");u.style.height=2*queue[t]+"px",u.style.left=15*t+"px",u.title=queue[t],oData.appendChild(u)}e&&(oData.getElementsByTagName("li")[e].className="active")}function changeQueue(){var e=Number(this.inpBox.value),t=event.target.name;if("button"==event.target.type){if("outLeft"==t)alert("您删除的元素是"+queue.shift());else if("outRight"==t)alert("您删除的元素是"+queue.pop());else if("randomArr"==t){for(var u=0;30>u;u++)queue[u]=Math.round(90*Math.random()+10);renderQueue()}else if("bubble"==t)bubbleSort(queue.length,0,queue);else{if(queue.length>60)return void alert("已超出60个！");""!=e&&/^[1-9]\d$|^100$/.test(e)?"toLeft"==t?queue.unshift(e):queue.push(e):alert("输入不合法，请重新输入！")}renderQueue()}}function bubbleSort(e,t,u){var a;e>0?(e-1>t?(u[t]>u[t+1]&&(a=u[t],u[t]=u[t+1],u[t+1]=a),renderQueue(t+1),t++):(e--,t=0),setTimeout(function(){bubbleSort(e,t,u)},30)):renderQueue()}function delData(){var e=oData.getElementsByTagName("li");if("LI"==event.target.tagName){for(var t=0;t<e.length;t++)if(event.target==e[t]){queue.splice(t,1);break}renderQueue()}}function init(){var e=document.getElementById("form1");e.addEventListener("click",changeQueue,!1),oData.addEventListener("click",delData,!1)}var oData=document.getElementById("data"),queue=[];init();
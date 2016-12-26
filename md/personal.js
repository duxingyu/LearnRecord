// 随机产生 n 个从 x 到 y 之间不重复的整数，返回数组
function fn(n, x, y) {
	var val = Math.round(Math.random() * (y - x) + x);
	var arr = [val];
	var num = 1;
	for (var i = 1; i < n; i++) {
		val = Math.round(Math.random() * (y - x) + x);
		num++;
		for (var j = 0; j < num; j++) {
			if (val == arr[j]) {
				n++;
				num--;
				break;
			}
			if (j == num - 1) {
				arr.push(val);
			}
		}
		if (i == n - 1) {
			return arr;
		}
	}
}
//	使数组拥有和string类似的indexOf()方法，返回含有该字符串的位置组成的数组（如第2项含有返回[2]）
function arrIndexOf(arr, val) {
	var str = '';
	var ar = [];
	for (var i = 0; i < arr.length; i++) {
		str = String(arr[i]);
		if (str.indexOf(String(val)) != -1) {
			ar.push(i);
		}
		if (i == arr.length - 1) {
			return ar;
		}
	}
}
//获取元素在页面的绝对位置	obj.left/top
function getPos(obj) {
	var pos = { left: 0, top: 0 };
	while (obj) {
		pos.left += obj.offsetLeft;
		pos.top += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return pos;
}
//判断鼠标滚轮上下  boolean
function mousewheel(ev) {
	var ev = ev || event;
	var b = true;
	if (ev.wheelDelta) {
		b = ev.wheelDelta > 0 ? true : false;
	} else {
		b = ev.detail < 0 ? true : false;
	}

}
// drag拖拽
function drag(obj) {
	obj.onmousedown = function(ev) {
		var ev = ev || event;

		var disX = ev.clientX - this.offsetLeft;
		var disY = ev.clientY - this.offsetTop;

		// if (obj.setCapture) obj.setCapture();
		document.onmousemove = function(ev) {
			var ev = ev || event;

			obj.style.left = ev.clientX + disX + 'px';
			obj.style.top = ev.clientY + disY + 'px';
		};
		document.onmouseup = function() {
			document.onmousemove = document.onmouseup = null;
			// if (obj.releaseCapture) obj.releaseCapture();
		};
		return false;
	};
}
// cookie 
// 设置cookie： setCookie('name','duxy',1);  1天
function setCookie(key, value, t) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + t);
	document.cookie = key + '=' + encodeURI(value) + ';expires=' + oDate.toGMTString();
}
// 获取cookie：getCookie('name');
function getCookie(key) {
	var arr1 = document.cookie.split('; ');
	for (var i = 0; i < arr1.length; i++) {
		var arr2 = arr1[i].split('=');
		if (arr2[0] == key) {
			return decodeURI(arr2[1]);
		}
	}
}
// 删除cookie：removeCookie('name');
function removeCookie(key) {
	setCookie(key, '', -1);
}

//	ajax
function ajax(method, url, data, success) {

	var xhr = new XMLHttpRequest();

	if (method == 'get' && data) {
		url += '?' + data;
	}
	xhr.open(method, url, true);

	if (method == 'get') {
		xhr.send();
	} else {
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}

	xhr.addEventListener('readystatechange', function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				success && success(xhr.responseText);
			} else {
				alert('出错了！Err：' + xhr.status);
			}
		}
	}, false);
}

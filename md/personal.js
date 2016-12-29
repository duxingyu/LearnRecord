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

// 时间版运动

function move(obj, json, times, fx, fn) {

	if (typeof times == 'undefined') {
		times = 400;
		fx = 'linear';
	}

	if (typeof times == 'string') {
		if (typeof fx == 'function') {
			fn = fx;
		}
		fx = times;
		times = 400;
	} else if (typeof times == 'function') {
		fn = times;
		times = 400;
		fx = 'linear';
	} else if (typeof times == 'number') {
		if (typeof fx == 'function') {
			fn = fx;
			fx = 'linear';
		} else if (typeof fx == 'undefined') {
			fx = 'linear';
		}
	}

	var iCur = {};

	for (var attr in json) {
		iCur[attr] = parseInt(getComputedStyle(obj)[attr]);
	}

	var startTime = new Date().getTime();

	clearInterval(obj.timer);

	obj.timer = setInterval(function() {

		var changeTime = new Date().getTime();

		var t = times - Math.max(0, startTime - changeTime + times);

		for (var attr in json) {
			var value = Tween[fx](t, iCur[attr], json[attr] - iCur[attr], times);

			obj.style[attr] = attr == 'opacity' ? value : value + 'px';
		}
		if (t == times) {
			clearInterval(obj.timer);
			if (fn) fn.call(obj);
		}
	}, 13);
	var Tween = {
		linear: function(t, b, c, d) { //匀速
			return c * t / d + b;
		},
		easeIn: function(t, b, c, d) { //加速曲线
			return c * (t /= d) * t + b;
		},
		easeOut: function(t, b, c, d) { //减速曲线
			return -c * (t /= d) * (t - 2) + b;
		},
		easeBoth: function(t, b, c, d) { //加速减速曲线
			if ((t /= d / 2) < 1) {
				return c / 2 * t * t + b;
			}
			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		},
		easeInStrong: function(t, b, c, d) { //加加速曲线
			return c * (t /= d) * t * t * t + b;
		},
		easeOutStrong: function(t, b, c, d) { //减减速曲线
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		easeBothStrong: function(t, b, c, d) { //加加速减减速曲线
			if ((t /= d / 2) < 1) {
				return c / 2 * t * t * t * t + b;
			}
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		},
		elasticIn: function(t, b, c, d, a, p) { //正弦衰减曲线（弹动渐入）
			if (t === 0) {
				return b;
			}
			if ((t /= d) == 1) {
				return b + c;
			}
			if (!p) {
				p = d * 0.3;
			}
			if (!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else {
				var s = p / (2 * Math.PI) * Math.asin(c / a);
			}
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		elasticOut: function(t, b, c, d, a, p) { //正弦增强曲线（弹动渐出）
			if (t === 0) {
				return b;
			}
			if ((t /= d) == 1) {
				return b + c;
			}
			if (!p) {
				p = d * 0.3;
			}
			if (!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else {
				var s = p / (2 * Math.PI) * Math.asin(c / a);
			}
			return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
		},
		elasticBoth: function(t, b, c, d, a, p) {
			if (t === 0) {
				return b;
			}
			if ((t /= d / 2) == 2) {
				return b + c;
			}
			if (!p) {
				p = d * (0.3 * 1.5);
			}
			if (!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else {
				var s = p / (2 * Math.PI) * Math.asin(c / a);
			}
			if (t < 1) {
				return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
					Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			}
			return a * Math.pow(2, -10 * (t -= 1)) *
				Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
		},
		backIn: function(t, b, c, d, s) { //回退加速（回退渐入）
			if (typeof s == 'undefined') {
				s = 1.70158;
			}
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		backOut: function(t, b, c, d, s) {
			if (typeof s == 'undefined') {
				s = 3.70158; //回缩的距离
			}
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		backBoth: function(t, b, c, d, s) {
			if (typeof s == 'undefined') {
				s = 1.70158;
			}
			if ((t /= d / 2) < 1) {
				return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			}
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		},
		bounceIn: function(t, b, c, d) { //弹球减振（弹球渐出）
			return c - Tween['bounceOut'](d - t, 0, c, d) + b;
		},
		bounceOut: function(t, b, c, d) {
			if ((t /= d) < (1 / 2.75)) {
				return c * (7.5625 * t * t) + b;
			} else if (t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
			} else if (t < (2.5 / 2.75)) {
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
			}
			return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
		},
		bounceBoth: function(t, b, c, d) {
			if (t < d / 2) {
				return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
			}
			return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
		}
	}
}

/*
 * 缓冲运动：
 * v = (target - current)/M; //6,7,8
 * v = v > 0 ? Math.ceil(v) : Math.floor(v);
 */

function bufferMove(obj, json, fn) {
	clearInterval(obj.timer);
	var iCur = 0;
	var iSpeed = 0;

	obj.timer = setInterval(function() {
		var iBtn = true;

		for (var attr in json) {
			var iTarget = json[attr];
			iCur = parseInt(getComputedStyle(obj)[attr]);

			iSpeed = (iTarget - iCur) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			if (iCur != iTarget) {
				iBtn = false;
				obj.style[attr] = iCur + iSpeed + 'px';
			}
		}
		if (iBtn) {
			clearInterval(obj.timer);
			fn && fn.call(obj);
		}
	}, 30);
}

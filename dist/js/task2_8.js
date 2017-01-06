'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var oData = document.getElementById('data');
var queue = [];

// 渲染data列表
function renderQueue(mark) {
	var aLi = oData.getElementsByTagName('li');
	if (!mark) {
		oData.innerHTML = '';

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = queue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var val = _step.value;

				var oLi = document.createElement('li');
				oLi.innerHTML = val;
				oData.appendChild(oLi);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	} else {
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].className = '';
		}
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = mark[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var value = _step2.value;

				aLi[value].className = 'active';
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}
	}
}

// 给每个button绑定函数

function changeQueue() {

	var oVal = this.inpBox.value;
	var oBtn = event.target.name;
	var reg = /[0-9a-zA-Z\u4e00-\u9fa5]+/g;
	var mark = [];

	if (event.target.type == 'button') {

		if (oBtn == 'outLeft') {
			alert('\u60A8\u5220\u9664\u7684\u5143\u7D20\u65F6\uFF1A' + queue.shift());
		} else if (oBtn == 'outRight') {
			alert('\u60A8\u5220\u9664\u7684\u5143\u7D20\u662F\uFF1A' + queue.pop());
		} else if (oBtn == 'serachBtn') {
			var serach = this.serachBox.value;
			if (serach) {
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {

					for (var _iterator3 = queue.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var _step3$value = _slicedToArray(_step3.value, 2),
						    i = _step3$value[0],
						    value = _step3$value[1];

						if (value.includes(serach)) mark.push(i);
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
			}
		} else {
			// 添加元素时处理逻辑

			if (oVal != '') {
				var valArr = oVal.match(reg);
				for (var i = 0; i < valArr.length; i++) {

					if (oBtn == 'toLeft') {
						queue.unshift(valArr[i]);
					} else {
						queue.push(valArr[i]);
					}
				}
			} else {
				alert('输入不合法，请重新输入！');
			}
		}

		mark.length >= 1 ? renderQueue(mark) : renderQueue();
	}
}

// 删除当前数据

function delData() {
	var aLi = oData.getElementsByTagName('li');
	if (event.target.tagName == 'LI') {

		for (var i = 0; i < aLi.length; i++) {
			if (event.target == aLi[i]) {
				queue.splice(i, 1);
				break;
			}
		}

		renderQueue();
	}
}

function init() {
	var oForm1 = document.getElementById('form1');

	oForm1.addEventListener('click', changeQueue, false);
	oData.addEventListener('click', delData, false);
}

init();
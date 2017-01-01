var oData = document.getElementById('data');
var queue = [];

// 渲染data列表，index：冒泡排序时标记
function renderQueue(index) {
	oData.innerHTML = '';

	for (let i = 0; i < queue.length; i++) {

		var oLi = document.createElement('li');
		oLi.style.height = 2 * queue[i] + 'px';
		oLi.style.left = i * 15 + 'px';
		oLi.title = queue[i];
		oData.appendChild(oLi);
	}
	if (index) {
		oData.getElementsByTagName('li')[index].className = 'active';
	}
}

// 给每个button绑定函数

function changeQueue() {

	var oVal = Number(this.inpBox.value);
	var oBtn = event.target.name;
	if (event.target.type == 'button') {

		if (oBtn == 'outLeft') {
			alert('您删除的元素是' + queue.shift());
		} else if (oBtn == 'outRight') {
			alert('您删除的元素是' + queue.pop());
		} else if (oBtn == 'randomArr') {
			// 随机只是用于测试，没有考虑其他因素
			for (let i = 0; i < 30; i++) {
				queue[i] = Math.round(Math.random() * 90 + 10);
			}
			renderQueue();
		} else if (oBtn == 'bubble') {

			bubbleSort(queue.length, 0, queue);
		} else {
			// 添加元素时处理逻辑

			if (queue.length > 60) {
				alert('已超出60个！');
				return;
			}
			// 限制输入元素的范围为：10-100
			if (oVal != '' && /^[1-9]\d$|^100$/.test(oVal)) {

				if (oBtn == 'toLeft') {
					queue.unshift(oVal);
				} else {
					queue.push(oVal);
				}
			} else {
				alert('输入不合法，请重新输入！');
			}

		}

		renderQueue();
	}

}

// 冒泡排序

function bubbleSort(len, i, arr) {
	var temp;

	if (len > 0) {
		if (i < len - 1) {
			if (arr[i] > arr[i + 1]) {
				temp = arr[i];
				arr[i] = arr[i + 1];
				arr[i + 1] = temp;
			}
			renderQueue(i + 1);
			i++;
		} else {
			len--;
			i = 0;
		}
		setTimeout(function() {
			bubbleSort(len, i, arr);
		}, 30);
	} else {
		renderQueue();
	}
}

// 删除当前数据

function delData() {
	var aLi = oData.getElementsByTagName('li');
	if (event.target.tagName == 'LI') {

		for (let i = 0; i < aLi.length; i++) {
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

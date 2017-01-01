var oData = document.getElementById('data');
var queue = [];

// 渲染data列表
function renderQueue() {
	oData.innerHTML = '';

	for (let i = 0; i < queue.length; i++) {
		oData.innerHTML += '<li>' + queue[i] + '</li>';
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
		} else {
			// 添加元素时处理逻辑

			if (oVal != '' && /\d+/.test(oVal)) {

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

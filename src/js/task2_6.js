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
	var oVal = this.inpBox.value;
	if (event.target.type == 'button') {

		if (oVal != '' && /\d+/.test(Number(oVal))) {

			switch (event.target.name) {
				case 'toLeft':
					queue.unshift(oVal);
					break;
				case 'toRight':
					queue.push(oVal);
					break;
				case 'outLeft':
					alert('您删除的元素是' + queue.shift());
					break;
				case 'outRight':
					alert('您删除的元素是' + queue.pop());
			}

			renderQueue();
		}
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

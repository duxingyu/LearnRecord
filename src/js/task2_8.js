const oData = document.getElementById('data');
var queue = [];

// 渲染data列表
function renderQueue(mark) {
	let aLi = oData.getElementsByTagName('li');
	if (!mark) {
		oData.innerHTML = '';

		for (let val of queue) {
			let oLi = document.createElement('li');
			oLi.innerHTML = val;
			oData.appendChild(oLi);
		}
	} else {
		for (let i = 0; i < aLi.length; i++) {
			aLi[i].className = '';
		}
		for (let value of mark) {
			aLi[value].className = 'active';
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
			alert(`您删除的元素时：${queue.shift()}`);
		} else if (oBtn == 'outRight') {
			alert(`您删除的元素是：${queue.pop()}`);
		} else if (oBtn == 'serachBtn') {
			let serach = this.serachBox.value;
			if (serach) {

				for (let [i, value] of queue.entries()) {
					if (value.includes(serach)) mark.push(i);
				}
			}
		} else {
			// 添加元素时处理逻辑

			if (oVal != '') {
				let valArr = oVal.match(reg);
				for (let i = 0; i < valArr.length; i++) {

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

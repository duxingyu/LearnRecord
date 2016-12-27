/**
 * 注意：
 * 1. button type属性默认为submit!!!,需要return false阻止！
 * 2. tbody为tr的父节点，而非table!!!
 * 3. 事件委托：event.target
 * 4. 改变this用call或apply
 * 5. 删除数据见 64
 * 6. window.onload
 */

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById('aqi-city-input');
	var aqi = document.getElementById('aqi-value-input');
	aqiData[city.value] = Number(aqi.value);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById('aqi-table');
	table.innerHTML = '<tbody><tr><td>城市</td><td>空气质量</td><td>操作</td></tr></tbody>';
	for (let attr in aqiData) {
		table.tBodies[0].innerHTML += '<tr><td>' + attr + '</td><td>' + aqiData[attr] + '</td><td><button>删除</button></td>';
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	var city = document.getElementById('aqi-city-input');
	var aqi = document.getElementById('aqi-value-input');
	// 对输入进行判断，非法则return
	if (city.value == '' || aqi.value == '' || isNaN(aqi.value)) {
		return;
	}
	addAqiData();
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
	// do sth.
	var tbody = document.getElementById('aqi-table').tBodies[0];
	delete aqiData[this.parentNode.parentNode.firstElementChild.innerHTML];
	renderAqiList();
	return false;
}

function init() {

	window.onload = function() {
		// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
		var addBtn = document.getElementById('add-btn');
		addBtn.addEventListener('click', addBtnHandle, false);
		// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
		var table = document.getElementById('aqi-table');
		table.addEventListener('click', function(ev) {
			if (ev.target.tagName.toLowerCase() == 'button') {
				delBtnHandle.call(ev.target);
			}
		}, false);
	}
}

init();

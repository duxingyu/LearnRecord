/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
	var y = dat.getFullYear();
	var m = dat.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = dat.getDate();
	d = d < 10 ? '0' + d : d;
	return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
	var returnData = {};
	var dat = new Date("2016-01-01");
	var datStr = '';
	for (var i = 1; i < 92; i++) {
		datStr = getDateStr(dat);
		returnData[datStr] = Math.ceil(Math.random() * seed);
		dat.setDate(dat.getDate() + 1);
	}
	return returnData;
}

var aqiSourceData = {
	"北京": randomBuildData(500),
	"上海": randomBuildData(300),
	"广州": randomBuildData(200),
	"深圳": randomBuildData(100),
	"成都": randomBuildData(300),
	"西安": randomBuildData(500),
	"福州": randomBuildData(100),
	"厦门": randomBuildData(100),
	"沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
	nowSelectCity: -1,
	nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {

	var chart = document.getElementsByClassName('aqi-chart-wrap')[0];
	var city = pageState.nowSelectCity;
	var graTime = pageState.nowGraTime;
	var data = aqiSourceData[city];
	var index = 0;
	var arr = [];
	var sum = 0;
	var oWidth = 0;

	chart.innerHTML = '';
	if (!chartData[city]) chartData[city] = {};
	if (!chartData[city][graTime]) {
		chartData[city][graTime] = [];

		for (let attr in data) {
			arr.push(data[attr]);
			index++;
			if (pageState.nowGraTime == 'week') {
				if (index % 7 == 0 || index == 91) {
					for (let i = 0; i < arr.length; i++) {
						sum += arr[i];
					}
					sum /= arr.length;
					chartData[city][graTime].push(Math.round(sum));
					arr = [];
					sum = 0;
				}
			} else if (pageState.nowGraTime == 'month') {
				if (index != 1 && (attr.split('-')[attr.split('-').length - 1] == '01' || index == 91)) {
					for (let i = 0; i < arr.length - 1; i++) {
						sum += arr[i];
					}
					sum /= arr.length - 1;
					chartData[city][graTime].push(Math.round(sum));
					arr[0] = arr[arr.length - 1];
					arr.length = 1;
					sum = 0;
				}
			}
		}
		if (pageState.nowGraTime == 'day') {
			chartData[city][graTime] = arr;
		}
	}
	switch (pageState.nowGraTime) {
		case 'day':
			oWidth = 5;
			break;
		case 'week':
			oWidth = 20;
			break;
		default:
			oWidth = 50;
	}
	var scale = Math.ceil((Math.max.apply(null, chartData[city][graTime])) / 100);

	for (let i = 0, cityData = chartData[city][graTime]; i < cityData.length; i++) {
		let oDiv = document.createElement('div');
		oDiv.style.width = oWidth + 'px';
		oDiv.style.height = cityData[i] / scale + 'px';
		oDiv.style.background = aqiColor(cityData[i] / scale);
		oDiv.style.position = 'absolute';
		oDiv.style.bottom = 0;
		oDiv.style.left = (oWidth + 1) * i + 'px';
		oDiv.title = cityData[i];
		chart.appendChild(oDiv);
	}
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
	// 确定是否选项发生了变化 
	var single = document.getElementsByName('gra-time');
	// 设置对应数据
	for (let i = 0, len = single.length; i < len; i++) {
		if (single[i].checked) pageState.nowGraTime = single[i].value;
	}
	// 调用图表渲染函数
	renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
	// 确定是否选项发生了变化 
	var select = document.getElementById('city-select');
	// var option = select.getElementsByTagName('option');
	// 设置对应数据
	pageState.nowSelectCity = select.value;
	// 调用图表渲染函数
	renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var single = document.getElementsByName('gra-time');
	for (let i = 0, len = single.length; i < len; i++) {
		single[i].addEventListener('change', graTimeChange, false);
	}
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
	// 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var select = document.getElementById('city-select');
	var city = null;

	for (let attr in aqiSourceData) {
		city = document.createElement('option');
		city.innerHTML = attr;
		select.appendChild(city);
	}

	// 给select设置事件，当选项发生变化时调用函数citySelectChange
	select.addEventListener('change', citySelectChange, false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
	// 将原始的源数据处理成图表需要的数据格式
	// 处理好的数据存到 chartData 中
	pageState.nowSelectCity = '北京';
	var chart = document.getElementsByClassName('aqi-chart-wrap')[0];
	var initdata = aqiSourceData.北京;
	var index = 0;
	for (let attr in initdata) {

		let oDiv = document.createElement('div');
		oDiv.style.width = '5px';
		oDiv.style.height = initdata[attr] / 5 + 'px';
		oDiv.style.backgroundColor = aqiColor(initdata[attr] / 5);
		oDiv.style.position = 'absolute';
		oDiv.style.bottom = 0;
		oDiv.style.left = 6 * index + 'px';
		oDiv.title = attr + '：' + initdata[attr];
		index++;
		chart.appendChild(oDiv);
	}
}

function aqiColor(obj) {
	var color = '';
	if (obj >= 0 && obj <= 20) {
		color = 'green';
	} else if (obj > 20 && obj <= 40) {
		color = 'blue';
	} else if (obj > 40 && obj <= 60) {
		color = 'red';
	} else if (obj > 60 && obj <= 80) {
		color = 'purple';
	} else {
		color = 'black';
	}
	return color;
}

/**
 * 初始化函数
 */
function init() {
	initGraTimeForm()
	initCitySelector();
	initAqiChartData();
}
window.onload = function() {
	init();
};

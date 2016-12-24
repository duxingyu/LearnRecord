var oList = document.getElementById('list');
var aLink = oList.getElementsByTagName('a');
var oSmall = document.getElementById('small');
var aLi2 = oSmall.getElementsByTagName('li');
var oPic = document.getElementsByTagName('img')[0];
var picJson = [
	['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
	['2.jpg', '3.jpg', '4.jpg'],
	['4.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'],
	['3.jpg', '2.jpg', '1.jpg', '4.jpg']
];
var liJson = [
	['全场一折起', '全场二折起', '全场三折起', '全场四折起'],
	['全场a3折起', '全场三折起', '全场四折起'],
	['全场一折起', '全场二折起', '全场三折起', '全场四折起', '全场五折起'],
	['全场1折起', '全场2折起', '全场3折起', '全场4折起']
];
// var json = {
// 	'1': {
// 		'pic': ['1.jpg','2.jpg', '3.jpg', '4.jpg'],
// 		'dec': ['全场一折起', '全场二折起', '全场三折起', '全场四折起']
// 	}
// };
// json[1][pic][1];
var data = [];

for (var i = 0; i < aLink.length; i++) {
	data.push(0);
	aLink[i].index = i;
	aLink[i].onclick = function() {
		fn1(this.index);
	};
}
fn1(0);

function fn1(n) {
	var str = '';
	oPic.src = picJson[n][data[n]];
	for (var i = 0; i < liJson[n].length; i++) {
		str += '<li>' + liJson[n][i] + '</li>';
	}
	oSmall.innerHTML = str;
	for (var i = 0; i < liJson[n].length; i++) {
		aLi2[i].index = i;
		aLi2[i].style.width = parseInt(getComputedStyle(oPic).width) / picJson[n].length + 'px';
		aLi2[i].onmouseover = function() {
			oPic.src = picJson[n][this.index];
			data[n] = this.index;
		};
	}
}

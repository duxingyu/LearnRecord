var aLi = document.getElementsByTagName('li');

for (var i = 0; i < aLi.length; i++) {
	fn(i);
}

function fn(i) {
	var aSpan = aLi[i].getElementsByTagName('span');
	var aLink = aLi[i].getElementsByTagName('a');
	var aInput = aLi[i].getElementsByTagName('input');
	var value = '';
	aLink[0].onclick = function() {
		value = aSpan[0].innerHTML;
		aSpan[1].style.display = 'inline';
		this.style.display = 'none';
		aSpan[0].innerHTML = '<input type="text" value="' + value + '">';
	};
	aLink[1].onclick = function() {
		fnx(1);
	};
	aLink[2].onclick = fnx;

	function fnx(str) {
		aSpan[0].innerHTML = str == 1 ? aInput[0].value : value;
		aSpan[1].style.display = 'none';
		aLink[0].style.display = 'inline';
	}
}

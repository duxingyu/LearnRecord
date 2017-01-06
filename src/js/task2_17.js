const aInp = document.getElementsByTagName('input');
const oSpan = document.querySelector('span');

aInp[1].addEventListener('click', function() {
	let val = aInp[0].value;
	let len = 0;

	for (let i of val) {
		if (i.charCodeAt() >= 0 && i.charCodeAt() <= 128) {
			len++;
		} else {
			len += 2;
		}
	}
	fn(len);
}, false);

function fn(len) {
	if (len >= 4 && len <= 16) {
		aInp[0].style.border = '1px solid green';
		oSpan.style.color = 'green';
		oSpan.innerHTML = '名称格式正确';
	} else {
		aInp[0].style.border = '1px solid red';
		oSpan.style.color = 'red';
		oSpan.innerHTML = '输入有误！';
	}
}

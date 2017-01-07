const aInp = document.querySelectorAll('#form1 input');
const aP = document.querySelectorAll('#form1 p');

aInp[0].addEventListener('focus', function() {
	let valid = new Validate('username', aP[0]);
	valid.focusFn();
}, false);
aInp[0].addEventListener('blur', function() {
	let valid = new Validate('username', aP[0]);
	valid.blurFn(this.value);
}, false);

function Validate(name, target) {
	this.target = target;
	this.name = name;
}
Validate.prototype.disMes = function() {
	let tip, errMes, corMes;
	switch (this.name) {
		case 'username':
			tip = '必填，长度为4~16个字符';
			errMes = '用户名错误';
			corMes = '用户名正确';
			reg = /^[0-9a-zA-Z_]{4,16}$/;
			break;
		case 'password':
			tip = '必填，6-16个字符组成，区分大小写';
			errMes = '密码错误';
			corMes = '密码可用';
			break;
		case 'passwords':
			tip = '必填，重复输入密码';
			errMes = '密码输入不一致';
			corMes = '密码输入一致';
			break;
		case 'telephone':
			tip = '手机号码，11位';
			errMes = '手机号码不正确';
			corMes = '手机号码输入正确';
			break;
		case 'email':
			tip = '邮箱';
			errMes = '邮箱格式不正确';
			corMes = '邮箱地址正确';
			break;
		default:
			reg = [/^[0-9a-zA-Z_]{4,16}$/];
			break;
	}
	return {
		tip: tip,
		errMes: errMes,
		corMes: corMes,
		reg: reg
	};
}
Validate.prototype.focusFn = function() {
	const oDiv = this.target.lastElementChild.tagName == 'DIV' ? this.target.lastElementChild : document.createElement('div');
	let { tip } = this.disMes();
	oDiv.innerHTML = tip;
	oDiv.style.color = '#ccc';
	this.target.appendChild(oDiv);
};
Validate.prototype.blurFn = function(val) {
	let { errMes, corMes, reg } = this.disMes();
	const oDiv = this.target.lastElementChild;
	if (reg.test(val)) {
		oDiv.innerHTML = corMes;
		oDiv.style.color = 'green';
		this.target.children[1].style.border = '1px solid green';
	} else {
		oDiv.innerHTML = errMes;
		oDiv.style.color = 'red';
		this.target.children[1].style.border = '1px solid red';
	}
};

aInp[5].addEventListener('click', function() {
	let valid = new Validate('submit');
	let { reg } = valid.disMes();
	for (let i = 0; i < reg.length; i++) {
		if (!reg[i].test(aInp[i].value)) {
			alert('输入有误');
			event.preventDefault();
			break;
		}
	}
}, false);

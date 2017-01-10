const obj = {
	name: 'duxy',
	age: 21,
	showName() {
		console.log(this.name);
	}
};
const age = 21;
exports.obj = obj;
exports.age = age;
// console.log(module.exports);

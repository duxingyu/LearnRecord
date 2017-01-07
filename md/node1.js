// let node1 = require('./node.js');
// let i = 0;
// setInterval(() => console.log(i++), 1000);
// console.log(process.memoryUsage());
// setTimeout(function() {
// 	process.exit();
// }, 10000);
/*process.stdout.write('请输入');
process.stdin.resume();
process.stdin.on('data', (chunk) => console.log(`输入结果为： ${chunk}`));*/
// var bur = new Buffer('我', 'utf-8');
// console.log(Buffer.byteLength('我是'));
const fs = require('fs');
// fs.open('2.txt', 'r', (err, fd) => console.log(`error: ${err}  fd: ${fd}。`));
// fs.openSync('1.txt', 'r');
var bf1 = new Buffer(10);
// var fd = fs.openSync('1.txt', 'r+');
// fs.read(fd, bf1, 0, 6, null, (err, len, bf) => console.log(String.fromCharCode(bf[0])));
// fs.appendFile('1.txt', 'ILOVEYOU!');
// fs.readFile('1.txt', (err, data) => console.log(data.toString()));
// fs.unlink('1.txt', (err) => console.log(err));
// fs.rename('1.txt', 'temp.txt', (err) => console.log(err));
// fs.stat('temp.txt', (err, stats) => console.log(stats));
// fs.watch('temp.txt', (event, name) => console.log(`${event}....${name}`));
// fs.mkdir('./23', (...res) => console.log(res))
fs.readdir('./', (...a) => console.log(a));

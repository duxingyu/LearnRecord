/*
 * Buffer
 */

const buf1 = Buffer.allocUnsafe(4);
const buf2 = Buffer.alloc(10, 23);
const buf3 = Buffer.from([1, 2, 3]);
const buf4 = Buffer.from('text', 'base64');
const buf5 = Buffer.from(buf3);
const buf6 = Buffer.from('http://www.baidu.com/s?wd=a');
// console.log(buf6.toString('base64'));
// for (let b of buf3) {
// 	console.log(b);
// }

const bufLen = Buffer.byteLength('杜星余', 'ascii');
// 返回-1，0,1，可用于arr排序
const sort = Buffer.compare(buf1, buf2);
const bufA = Buffer.concat([buf1, buf2], 10);

const arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;
const buf7 = Buffer.from(arr.buffer);
const isBuffer = Buffer.isBuffer(sort);
const isEncoding = Buffer.isEncoding('utf-8');
const poolSize = Buffer.poolSize;
Buffer.poolSize = 1000;
// 返回-1,0,1
buf4.compare(buf2);
/*const buf8 = Buffer.allocUnsafe(10);
console.log(buf8);
buf8.copy(buf7);
console.log(buf8);*/
// for (let pair of buf4.entries()) {
// 	console.log(pair);
// }
// console.log(buf5.equals(buf3));

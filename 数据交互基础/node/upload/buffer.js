let a = new Buffer('abc');
let b = new Buffer('def');

let c= Buffer.concat([a, b]);
let d = a + b;

console.log('a', '|||', a);
console.log('b', '|||', b);
console.log('c', '|||', c);
console.log('d', '|||', d);

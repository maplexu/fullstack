let b = new Buffer('abccc-=-ddder-=-qwerqwer');
console.log(b.indexOf('-=-'));
console.log(b.indexOf(new Buffer('-=-')));

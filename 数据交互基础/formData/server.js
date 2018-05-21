const http = require('http');
const urlLib = require('url');
const querystring = require('querystring');

http.createServer((req, res) => {

  if(req.headers['origin'] == 'null' || req.headers['origin'].startsWith('http://localhost')){
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(11);
  }

  let { pathname: url, query: get } = urlLib.parse(req.url, true);

  let arr = [];
  req.on('data', data => {
    arr.push(data);
  });

  req.on('end', () => {
    let post = querystring.parse(Buffer.concat(arr).toString());

    console.log(url, get, post);

    res.write('asdfas');
    res.end();
  })
}).listen(8080);

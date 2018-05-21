const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  let str = "";
  req.on('data', data => {
    console.log(data);
    console.log(data.toString());
    str += data;
  });

  req.on('end', () => {
    let post = querystring.parse(str);

    console.log(str, post);
  })

  res.end();
})

server.listen(8080);

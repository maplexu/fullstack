const fs = require('fs');
const http = require('http');

let server = http.createServer((req, res) => {
  let rs = fs.createReadStream(`www${req.url}`);

  rs.pipe(res);

  rs.on('error', error => {
    res.writeHeader(404);
    res.write('Not Found');

    res.end();
  })
})

server.listen(8080);

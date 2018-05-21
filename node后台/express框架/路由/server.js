const express = require('express');

let server = express();
server.listen(8080);

server.use('/article', require('./routes/article'));
server.use('/user', require('./routes/user'));

server.use((req, res) => {
  res.send('404');
})

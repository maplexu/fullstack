const express = require('express');

let server = express();
server.listen(8090);

server.get('/tags', (req, res) => {
  res.send(['推荐','影视','音乐','搞笑','娱乐','生活', '科技','体育']);
})

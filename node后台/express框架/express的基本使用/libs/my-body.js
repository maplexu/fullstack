const querystring = require('querystring');

module.exports = (req, res, next) => {
  let arr = [];
  req.on('data', data => {
    arr.push(data);
  })
  req.on('end', () => {
    req.body = querystring.parse(Buffer.concat(arr).toString());

    next();
  })
}

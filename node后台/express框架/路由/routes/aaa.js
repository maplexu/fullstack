const express = require('express');

let router = express.Router();

router.get('', (req, res) => {res.send('article下面的aaa首页')})
router.get('/a', require('./aaa/a'));
router.get('/b', require('./aaa/b'));
router.get('/c', require('./aaa/c'));

module.exports = router;

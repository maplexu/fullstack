const express = require('express');

let router = express.Router();

router.get('', (req, res) => {
  res.send('文章首页');
})
router.get('/:id', (req, res) => {
  let {id} = req.params;
  res.send(`${id}的文章内容`);
})
router.get('/:id/comment', (req, res) => {
  let {id} = req.params;

  res.send(`${id}的评论`);
})
router.get('/:id/edit', (req, res) => {
  let {id} = req.params;
  res.send(`编辑${id}`);
})

router.use('/aaa', require('./aaa'));

module.exports = router;

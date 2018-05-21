const express = require('express');

let router = express.Router();

router.get('', (req, res) => {
  res.send('用户首页')
})
router.get('/:id', (req, res)=>{
  let {id} = req.params;
  res.send(`${id}用户信息`);
})
router.get('/:id/comment', (req, res) => {
  res.send('用户发的评论')
})

module.exports = router;

//处理session

const Koa = require('koa');
const session = require('koa-session');

let server = new Koa();
server.listen(8080);

//给session使用的滚动密钥要添加在server上面
server.keys = [
  'asdfgsdfyjur6754erstdyfi7fut6dtrtdfju6y5srgxthj',
  'sfghjdt6e5te4rthyj7u6y5t4sregtdhfr6y5',
  'fghftdr5sesgtdhyf6dt5resgtdh5grsthy',
  'gfhgfsdyjufu65trdhfyu76ytr5gthytreg',
  'yjy5rte4ts5yju8kgynbxgrefsrdthyn',
  'sedtrhygregdthynhtgrestdhrges',
  's5d6yfjtrgesdthyujtrghtjugfhydr6tu7fhgfhfju',
];

server.use(session({}, server));

server.use(async ctx => {
  if(ctx.session['count']){
    ctx.session['count']++;
  }else{
    ctx.session['count'] = 1;
  }

  ctx.response.body = `这是你第${ctx.session.count}次来访`;
})

const Router = require('koa-router');

let router = new Router();

//处理上级路由下默认路径的请求 ---- http:localhost:8080/
router.get('', async ctx => {
  let page = 1;             //当前的页码
  let page_size = 8;        //每页的数目

  //获取要显示的问题列表（第一页上显示的问题）
  let questions = await ctx.db.execute(`
    SELECT Q.ID, Q.title, ANSWER.content AS best_answer_content, AUTHOR.name, AUTHOR.headline FROM

    question_table AS Q
    LEFT JOIN answer_table AS ANSWER ON Q.best_answer_ID = ANSWER.ID
    LEFT JOIN author_table AS AUTHOR ON ANSWER.author_ID = AUTHOR.ID

    LIMIT ${(page-1)*page_size}, ${page_size}
  `);

  await ctx.render('list', {
    questions
  })
})

//处理对上级路由下 detail/123131 路径的请求 ---- http://localhost:8080/detail/234234234

router.get('detail/:id', async (ctx, next) => {
  let {id} = ctx.params;


  //1.先获取请求的该问题(返回的是一个数组)：
  let question = (await ctx.db.execute(`SELECT * FROM question_table WHERE ID=${id}`))[0];

  //2.获取该问题对应的所有回答：
  let answers = await ctx.db.execute(`
    SELECT * FROM
    answer_table AS ANSWER
    LEFT JOIN author_table AS AUTHOR ON ANSWER.author_ID=AUTHOR.ID
    WHERE question_id=${id}
  `);
  console.log(answers);
  question.best_answer = answers[0];
  answers.splice(0, 1);

  //3.查询该问题对应的所有标签
  let topics = await ctx.db.execute(`SELECT * FROM topics_table WHERE ID IN (${question.topics})`);

  await ctx.render('item', {
    question,
    answers,
    topics
  })
})

module.exports = router.routes();

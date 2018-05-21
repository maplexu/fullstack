/*
    写数据，解析.topics中的数据，并将它们写入数据库中
*/

const fs = require('fs');
const Mysql = require('mysql-pro');

const db = new Mysql({
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: '知乎'
  }
})

const arr = JSON.parse(fs.readFileSync('.topics').toString());

// console.log(arr[0]);

//需要向四个表中添加数据：

//下面设置了四个对象，专门用于存放四个表中对应的数据
let topics = {}, topic_ID = 1;
let authors = {}, author_ID = 1;
let questions = {}, question_ID = 1;
let answers = {}, answer_ID = 1;

//对整个原始数组进行遍历，构造出我们需要的数据结构，然后添加到上面的对象中去
arr.forEach(question => {
  //topics
  //给数组中的每一项上新增一个topics属性，用于记录每个问题上对应的标签的集合
  question.topics = question.topices.map(json => {
    let {title} = json;
    title = title.replace(/^\s+|\s+$/g, '');

    //手动来给对应的topics数据项添加id
    if(!topics[title]){
      topics[title] = topic_ID++;
    }
    return topics[title];
  }).join(',');

  //author
  [question.bestAnswer.author, ...question.answers.map(answer => answer.author)].forEach((author, index) => {
    let old_id = author.id;
    if(!authors[old_id]){
      authors[author.id] = author;
      author.id = question_ID++;

    }
    if(index == 0){
      delete question.bestAnswer.author;
      question.bestAnswer.author_ID = author.id;
    }else{
      delete question.answers[index - 1].author;
      question.answers[index - 1].author_ID = author.id;
    }

    return authors[old_id];
  });


  //question:
  let ID = question_ID;
  questions[question_ID++] = question;

  //answers:
  [question.bestAnswer, ...question.answers].forEach(answer => {
    answer.id = answer_ID;
    answer.question_ID = ID;
    answers[answer_ID++] = answer;
  });
});



//开始将上面得到的数据添加进数据库中去
(async ()=>{

  //封装一个函数，过滤文本中自带的'对拼接的sql语句中的'的干扰
  function dataJoin(...args){
    //这里在return的时候前后加的圆括号以及引号是为了结合下面sql语句中的连续执行多项
    return "('" + args.map(item => {
      //注意:这里的数字0不能转换为空字符串，因为空字符传传入int类型的字段时会报错
      if(typeof item == 'number'){
        item = item || 0;
      }else{
        item = item || '';                    //区分值是否为undefined
      }
      item = item.toString().replace(/'/g, '\\\'');           //过滤文本中自带的引号
      return item;
    }).join("','") + "')"
  }

  //topics:
  let aTopics = [];
  for(let title in topics){
    let ID = topics[title];
    //注意，这里要拼接sql语句，因此字符串参数都要加引号，这样才符合sql语句的规范（打印下面的sql字符串就能知道加引号的必要性了）
    //aTopics.push(`('${ID}', '${title}')`);
    aTopics.push(dataJoin(ID, title));
  }
  let topic_sql = `INSERT INTO topic_table VALUES${aTopics.join(',')}`;


  //authors:
  let aAuthors = [];
  for(let id in authors){
    let author = authors[id];

    aAuthors.push(dataJoin(author.id, author.type, author.name, author.gender, author.userType, author.img_url, author.headline, author.followerCount));
  }
  let author_sql = `INSERT INTO author_table VALUES${aAuthors.join(',')}`;

  //questions:
  let aQuestions = [];
  for(let ID in questions){
    let question = questions[ID];

    aQuestions.push(dataJoin(ID, question.title, question.question_content, question.topics, question.attention_count, question.view_count, question.bestAnswer.id));
  }
  let question_sql = `INSERT INTO question_table VALUES${aQuestions.join(',')}`;

  //answers:
  let aAnswers = [];
  let xx = 1;
  for(let ID in answers){
    let answer = answers[ID];
    aAnswers.push(dataJoin(ID, answer.question_ID, answer.author_ID, answer.content, answer.createdTime));
  }
  let answer_sql = `INSERT INTO answer_table VALUES${aAnswers.join(',')}`;


  try{
    await db.startTransaction();
    await db.executeTransaction(topic_sql);
    await db.executeTransaction(author_sql);
    await db.executeTransaction(question_sql);
    await db.executeTransaction(answer_sql);
    await db.stopTransaction();
    console.log('数据插入完成');
  }catch(error){
    console.log(error);
  }
})();

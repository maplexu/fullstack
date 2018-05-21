function sleep(t){
  return new Promise((resolve, reject) => {
    setTimeout(function(){
      resolve();
    }, t);
  });
}

(async ()=> {
  for(let i = 0; i < 10; i++){
    await sleep(1000);

    console.log(i);
  }
})()

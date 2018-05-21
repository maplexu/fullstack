import common from './common';

console.log(112233);
window.onload = function(){
  document.onclick = function(){
    console.log(common.sum(3, 4));
  }
}

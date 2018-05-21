import $ from 'jquery';
import a from './asset/a.png';

$(function(){
  console.log(a);
  $('.txt').click(function(){
    $('.txt').css({
      width: '360px',
      height: '360px',
      background: `url(dist/${a}) no-repeat`
    })
  })
})

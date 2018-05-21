import $ from 'jquery';

$(function(){
  $('.txt').click(function(){
    console.log('点击文本11');
    $('.txt').css({
      'background': 'red'
    })
  })
})

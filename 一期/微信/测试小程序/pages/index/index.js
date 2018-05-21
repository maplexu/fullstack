//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tags: [],
    now: 0,
    left: 0,
    list: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 }
    ]
  },
  onLoad(options){
    wx.request({
      url: 'http://localhost:8090/tags',
      dataType: 'json',
      success: (res) => {
        this.setData({
          tags: res.data
        })
      },
      fail(){
        console.log('获取数据失败');
      }
    })
  },
  fnClick(ev){
    console.log(ev.target.dataset.index); //获取对应组件上的自定义属性
    this.setData({
      now: ev.target.dataset.index,
      left: ev.target.offsetLeft          //获取当前点击组件的offsetLeft 
    })
  }
})

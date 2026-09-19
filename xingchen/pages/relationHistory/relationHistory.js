const app=getApp()
Page({
  data:{
    historyList:[]
  },
  onShow(){
    const list=wx.getStorageSync("historyList")||[];
    console.log("读取历史记录",list)
    this.setData({
      historyList:list
    })
  },
  goDetail(e){
    const idx=e.currentTarget.dataset.index;
    wx.navigateTo({
      url:`/pages/reportDetail/reportDetail?index=${idx}`
    })
  },
  //跳转用户健康数据
  goHealthData(){
    wx.navigateTo({
      url:"/pages/report/report"
    })
  },
  //暖心留言（页面已删除，临时返回主页，以后新建留言页再修改）
  goWarmMessage(){
    wx.navigateTo({
      url:"/pages/warmMsg/warmMsg"
    })
  }
})


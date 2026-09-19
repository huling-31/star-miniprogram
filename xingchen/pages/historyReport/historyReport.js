const app = getApp()
Page({
  data:{
    historyList:[]
  },
  onShow(){
    // 读取全局保存的历史报告
    const list = app.globalData.emotionHistory || []
    this.setData({
      historyList: list
    })
  },
  // 点击卡片跳转到详情
  goDetail(e){
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url:`/pages/reportDetail/reportDetail?data=${encodeURIComponent(JSON.stringify(item))}`
    })
  },
  goHome(){
    wx.navigateBack()
  }
})

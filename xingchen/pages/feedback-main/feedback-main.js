const app = getApp()
Page({
  data:{
    historyList:[],
    feedbackText:""
  },
  onLoad(){
    //读取本地存储的情绪历史
    const history = wx.getStorageSync("emotionRecord") || []
    this.setData({historyList:history})
  },
  submitFeedback(){
    if(!this.data.feedbackText){
      wx.showToast({title:"请输入留言内容",icon:"none"})
      return
    }
    app.globalData.relationFeedback.push({
      content:this.data.feedbackText,
      time:new Date().toLocaleString()
    })
    wx.showToast({title:"留言提交成功",icon:"success"})
    this.setData({feedbackText:""})
  },
  back(){
    wx.navigateBack()
  }
})

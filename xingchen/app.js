App({
  globalData: {
    userInfo:null,
    emotionHistory: [],
    userSpeechContent:"",
    relationUser:null,
    relationFeedback:[]
  },
  destroySpeechContent(){
    this.globalData.userSpeechContent = ""
    wx.showToast({
      title:"倾诉内容已销毁",
      icon:"success"
    })
  }
})


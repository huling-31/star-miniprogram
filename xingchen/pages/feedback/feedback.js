Page({
  data:{
    clickCount:0,
    timer:null
  },
  // 标题点击，隐藏入口计数
  secretEntryTap(){
    let count = this.data.clickCount + 1
    this.setData({clickCount:count})
    // 5次点击触发弹窗
    if(count >=5){
      this.setData({clickCount:0})
      wx.showModal({
        title:"关联方通道",
        content:"此通道仅授权家人/老师/好友使用，是否前往登录？",
        success(res){
          if(res.confirm){
            wx.navigateTo({
              url:"/pages/feedback-login/feedback-login"
            })
          }
        }
      })
    }
    // 2秒不点击，计数器重置
    clearTimeout(this.data.timer)
    const t = setTimeout(()=>{
      this.setData({clickCount:0})
    },2000)
    this.setData({timer:t})
  },

  goCall(){
    wx.navigateTo({url:"/pages/call/call"})
  },
  goReport(){
    wx.navigateTo({url:"/pages/report/report"})
  }
})

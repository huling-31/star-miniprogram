const app = getApp()
Page({
  data: {
    translateY: 0,
    timer: null
  },
  onShow() {
    const isLogin = wx.getStorageSync("isLogin")
    if(!isLogin){
      wx.redirectTo({url:"/pages/login/login"})
      return
    }
    this.startScroll()
  },
  onHide() {
    this.stopScroll()
  },
  onUnload() {
    this.stopScroll()
  },
  startScroll() {
    this.stopScroll()
    const timer = setInterval(() => {
      let translateY = this.data.translateY - 1
      if (translateY <= -1800) {
        translateY = 0
      }
      this.setData({ translateY })
    }, 80)
    this.setData({ timer })
  },
  stopScroll() {
    if (this.data.timer) {
      clearInterval(this.data.timer)
      this.setData({ timer: null })
    }
  },
  goCall() {
    wx.navigateTo({ url: "/pages/call/call" })
  },
  goTodayReport() {
    wx.navigateTo({ url: "/pages/report/report" })
  },
  goHistoryReport() {
    wx.navigateTo({ url: "/pages/historyReport/historyReport" })
  }
})


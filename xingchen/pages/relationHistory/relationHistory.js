const app = getApp()
Page({
  data: {
    reportList: []
  },
  onLoad() {
    //身份校验：非关联方直接打回登录页
    const ut = wx.getStorageSync("userType")
    if (ut !== "relation") {
      wx.redirectTo({
        url: "/pages/login/login"
      })
      return
    }
    //读取情绪报告历史数据
    this.loadReportData()
  },
  onShow() {
    this.loadReportData()
  },
  loadReportData() {
    const list = wx.getStorageSync("emotionReportList") || []
    this.setData({
      reportList: list
    })
  },
  //跳转报告详情页
  goDetail(e) {
    const idx = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/reportDetail/reportDetail?index=${idx}`
    })
  },
  //跳转暖心留言页面
  goWarmMsg() {
    wx.navigateTo({
      url: "/pages/warmMsg/warmMsg"
    })
  },
  backLogin() {
    //退出登录，清除本地登录标记
    wx.clearStorageSync()
    wx.redirectTo({
      url: "/pages/login/login"
    })
  }
})


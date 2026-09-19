const app = getApp()
Page({
  data: {
    historyList: []
  },
  onLoad() {
    //身份校验：非关联方直接打回登录页
    const ut = wx.getStorageSync("userType")
    console.log("读取到的userType：", ut)
    if (ut !== "relation") {
      wx.redirectTo({
        url: "/pages/login/login"
      })
      return
    }
    this.loadReportData()
  },
  onShow() {
    this.loadReportData()
  },
  loadReportData() {
    const list = wx.getStorageSync("emotionReportList") || []
    this.setData({
      historyList: list
    })
  },
  //跳转报告详情
  goDetail(e) {
    const idx = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/reportDetail/reportDetail?index=${idx}`
    })
  },
  //跳转暖心留言
  goWarmMsg() {
    wx.navigateTo({
      url: "/pages/warmMsg/warmMsg"
    })
  },
  //跳转 用户健康数据（今日情绪数据页面 report）
  goHealthData() {
    wx.navigateTo({
      url: "/pages/report/report"
    })
  },
  backLogin() {
    wx.clearStorageSync()
    wx.redirectTo({
      url: "/pages/login/login"
    })
  }
})

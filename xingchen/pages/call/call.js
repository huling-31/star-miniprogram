const app = getApp()
Page({
  data: {
    isRecording: false,
    tipTextTop: "开始通话",
    tipTextBottom: "说出你的心事，星辰会在这里聆听"
  },
  startRecord() {
    this.setData({
      isRecording: true,
      tipTextTop: "正在聆听",
      tipTextBottom: "请继续说，星辰正在认真听"
    })
    wx.showToast({ title: "正在聆听", icon: "none", duration: 99999 })
  },
  stopRecord() {
    this.setData({
      isRecording: false,
      tipTextTop: "语音回复中",
      tipTextBottom: "星辰正在组织温暖的回应"
    })
    wx.hideToast()
    wx.showToast({ title: "语音回复中", icon: "none", duration: 1500 })
  },
  triggerEndCall() {
    wx.showModal({
      title: "结束本次倾诉通话？",
      content: "确认结束后，本次口述内容将全部销毁，仅保留情绪指标记录。",
      confirmText: "确认结束",
      cancelText: "继续倾诉",
      success: (res) => {
        if (res.confirm) {
          const mockVal = Math.floor(Math.random() * 80) + 20
          app.globalData.emotionHistory.push({
            date: new Date().toLocaleDateString(),
            score: mockVal,
            reply: "谢谢你愿意说出内心的感受，不必独自硬扛。"
          })
          app.destroySpeechContent()
          wx.showToast({ title: "倾诉内容已销毁", icon: "success", duration: 1200 })
          setTimeout(() => {
            wx.navigateTo({ url: "/pages/report/report" })
          }, 1200)
        }
      }
    })
  },
  goHome() {
    wx.navigateBack()
  }
})


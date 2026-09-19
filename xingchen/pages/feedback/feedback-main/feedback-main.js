const app = getApp()
Page({
  data:{
    relationInfo:{},
    feedbackText:""
  },
  onLoad(){
    const relation = app.globalData.relationUser
    this.setData({relationInfo:relation})
    const history = app.globalData.emotionHistory
    this.drawChart(history)
  },
  inputFeedback(e){
    this.setData({feedbackText:e.detail.value})
  },
  saveFeedback(){
    if(!this.data.feedbackText){
      wx.showToast({title:"请填写观察内容",icon:"none"})
      return
    }
    //存入全局（作品集演示用，真实项目可以存云开发数据库）
    app.globalData.relationFeedback.push({
      info:this.data.relationInfo,
      content:this.data.feedbackText,
      time:new Date().toLocaleString()
    })
    wx.showToast({title:"反馈保存成功"})
  },

  // 和report页面一致的图表
  drawChart(history){
    const ctx = wx.createCanvasContext('relationCanvas')
    const canvasW = 640
    const canvasH = 300
    const padding = 40
    const maxLevel =10
    const baselineMin =1
    const baselineMax =4
    ctx.clearRect(0,0,canvasW,canvasH)
    //参考基线灰色区域
    ctx.setFillStyle('#e9e3dd')
    const yBaselineTop = canvasH - padding - (baselineMax/maxLevel)*(canvasH - padding*2)
    const yBaselineBot = canvasH - padding - (baselineMin/maxLevel)*(canvasH - padding*2)
    ctx.fillRect(padding, yBaselineTop, canvasW-padding*2, yBaselineBot - yBaselineTop)

    //坐标轴
    ctx.setStrokeStyle('#b89c7b')
    ctx.setLineWidth(2)
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvasH-padding)
    ctx.lineTo(canvasW-padding, canvasH-padding)
    ctx.stroke()

    //折线
    ctx.setStrokeStyle('#f28c46')
    ctx.setLineWidth(3)
    ctx.beginPath()
    const stepX = (canvasW - padding*2) / (history.length-1 || 1)
    history.forEach((item,idx)=>{
      const x = padding + idx*stepX
      const y = canvasH - padding - (item.level/maxLevel)*(canvasH-padding*2)
      if(idx===0) ctx.moveTo(x,y)
      else ctx.lineTo(x,y)
      ctx.fillStyle='#f2a85a'
      ctx.arc(x,y,6,0,2*Math.PI)
      ctx.fill()
    })
    ctx.stroke()
    ctx.draw()
  },
  goBack(){
    wx.navigateBack()
  }
})

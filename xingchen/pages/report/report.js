const app = getApp()
Page({
  data:{
    emotionVal:50,
    depressVal:48,
    waveVal:76,
    warmWords:""
  },
  onLoad(){
    const history = app.globalData.emotionHistory
    let val = history[history.length-1]?.index || 50
    let depress = 100 - val
    let wave = val + 25
    this.setData({
      emotionVal:val,
      depressVal:depress,
      waveVal:wave
    })
    relationMsgList: [] //空留言数组，后续关联方追加留言
    if(val < 35){
      this.setData({warmWords:"我知道此刻你背负着沉重的情绪，不必强迫自己立刻振作起来。允许自己停下来休息，不必追赶别人的节奏，你的疲惫值得被接纳，星辰会安静陪伴你，慢慢度过这段难熬的时光。"})
    }else if(val <65){
      this.setData({warmWords:"今天你已经很努力地撑过来了，情绪起伏是很正常的事情，不用因为偶尔低落责怪自己。累的时候就短暂歇一歇，不用逼着自己一直坚强，小小的喘息，也是属于你的勇敢。"})
    }else{
      this.setData({warmWords:"今天你的情绪状态很不错，能够安稳地感受生活本身就是一件很珍贵的事。好好拥抱当下的自己，接纳所有微小的情绪，平凡的日常里，一直藏着温柔的微光。"})
    }
  },
  goHome(){
    wx.navigateTo({url:"/pages/index/index"})
  },
  goHistory(){
    wx.navigateTo({url:"/pages/historyReport/historyReport"})
}
})

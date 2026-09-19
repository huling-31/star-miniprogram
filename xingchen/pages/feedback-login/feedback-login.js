const app = getApp()
Page({
  data:{
    relAccount:"",
    relPhone:""
  },
  loginCheck(){
    // 和登录页存储的关联方信息比对
    const savedRel = app.globalData.relationUser
    const {relAccount,relPhone} = this.data
    if(!savedRel){
      wx.showToast({title:"暂无备案关联人信息",icon:"none"})
      return
    }
    //账号+手机号匹配
    if(relAccount === savedRel.relAccount && relPhone === savedRel.relPhone){
      wx.navigateTo({url:"/pages/feedback-main/feedback-main"})
    }else{
      wx.showToast({title:"账号或号码不匹配",icon:"none"})
    }
  },
  backHome(){
    wx.navigateBack()
  }
})

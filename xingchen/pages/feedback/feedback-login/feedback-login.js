const app = getApp()
Page({
  data:{
    nick:"",
    phone:"",
    account:"",
    pwd:""
  },
  inputNick(e){this.setData({nick:e.detail.value})},
  inputPhone(e){this.setData({phone:e.detail.value})},
  inputAccount(e){this.setData({account:e.detail.value})},
  inputPwd(e){this.setData({pwd:e.detail.value})},

  checkAuth(){
    const {nick,phone,account,pwd} = this.data
    if(!nick || !phone || !account || !pwd){
      wx.showToast({title:"请填写全部信息",icon:"none"})
      return
    }
    //演示密码，作品集可以直接用这个，你后续可以修改
    if(pwd !== "star123"){
      wx.showToast({title:"密码错误",icon:"error"})
      return
    }
    //保存关联方信息到全局
    app.globalData.relationUser = {nick,phone,account}
    wx.showToast({title:"身份验证成功"})
    setTimeout(()=>{
      wx.navigateTo({url:"/pages/feedback-main/feedback-main"})
    },1000)
  },
  goBack(){
    wx.navigateBack()
  }
})

const app = getApp()
Page({
  data: {
    userType: "user", // 默认普通用户 user / relation
    nickName:"",
    pwd:"",
    relName:"",
    relPhone:""
  },

  //切换身份类型
  selectType(e){
    const type = e.currentTarget.dataset.type
    this.setData({
      userType: type,
      //切换清空输入框
      nickName:"",
      pwd:"",
      relName:"",
      relPhone:""
    })
  },

  doLogin(){
    const {userType} = this.data
    // ====== 普通用户登录 ======
    if(userType === "user"){
      const {nickName, pwd} = this.data
      if(!nickName || !pwd){
        wx.showToast({title:"请填写昵称和密码",icon:"none"})
        return
      }
      const userInfo = wx.getStorageSync("userInfo")
      if(!userInfo){
        wx.showToast({title:"该账号尚未注册",icon:"none"})
        return
      }
      if(userInfo.nickName !== nickName || userInfo.pwd !== pwd){
        wx.showToast({title:"昵称或密码错误",icon:"none"})
        return
      }
      wx.setStorageSync("isLogin", true)
      wx.showToast({title:"登录成功",icon:"success"})
      setTimeout(()=>{
        wx.navigateTo({url:"/pages/index/index"})
      },1200)
    }
    // ====== 关联方登录 ======
    else if(userType === "relation"){
      const {relName, relPhone} = this.data
      if(!relName || !relPhone){
        wx.showToast({title:"请填写关联方姓名和手机号",icon:"none"})
        return
      }
      const userInfo = wx.getStorageSync("userInfo")
      if(!userInfo){
        wx.showToast({title:"暂无用户注册信息",icon:"none"})
        return
      }
      if(userInfo.relationName !== relName || userInfo.relationPhone !== relPhone){
        wx.showToast({title:"关联方信息不匹配",icon:"none"})
        return
      }
      wx.showToast({title:"关联方登录成功",icon:"success"})
      setTimeout(()=>{
      wx.navigateTo({url:"/pages/relationHistory/relationHistory"})
      },1000)
    }
  },

  //微信一键登录（原型演示，仅普通用户可用）
  wxLogin(){
    if(this.data.userType === "relation"){
      wx.showToast({title:"关联方暂不支持微信登录",icon:"none"})
      return
    }
    wx.showToast({title:"微信登录(演示)",icon:"none"})
    wx.setStorageSync("isLogin", true)
    setTimeout(()=>{
      wx.navigateTo({url:"/pages/index/index"})
    },800)
  },

  goRegister(){
    wx.navigateTo({url:"/pages/register/register"})
  }
})

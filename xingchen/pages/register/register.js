const app = getApp()
Page({
  data: {
    name:"",
    phone:"",
    nickName:"",
    pwd:"",
    pwd2:"",
    relationName:"",
    relationType:"",
    relationPhone:""
  },
  //单选框选择
  radioChange(e){
    this.setData({
      relationType:e.detail.value
    })
  },
  // 注册提交，密码规则校验
  onRegister(){
    const pwd = this.data.pwd.trim()
    // 1.长度必须8位
    if(pwd.length !== 8){
      wx.showToast({title:"密码必须为8个字符",icon:"none"})
      return
    }
    // 2.至少1小写字母
    const hasLower = /[a-z]/.test(pwd)
    //3.至少1大写字母
    const hasUpper = /[A-Z]/.test(pwd)
    //4.至少1数字
    const hasNumber = /\d/.test(pwd)

    if(!hasLower || !hasUpper || !hasNumber){
      wx.showToast({
        title:"密码需要包含：大小写字母+数字",
        icon:"none"
      })
      return
    }
    //两次密码比对
    if(this.data.pwd !== this.data.pwd2){
      wx.showToast({title:"两次输入密码不一致",icon:"none"})
      return
    }
    //手机号简单校验
    if(!/^1[3-9]\d{9}$/.test(this.data.phone)){
      wx.showToast({title:"请输入正确的11位手机号",icon:"none"})
      return
    }
    if(!/^1[3-9]\d{9}$/.test(this.data.relationPhone)){
      wx.showToast({title:"关联方手机号格式错误",icon:"none"})
      return
    }

    // 存入缓存
    const userData = {
      name: this.data.name,
      phone: this.data.phone,
      nickName: this.data.nickName,
      pwd: this.data.pwd,
      relationName: this.data.relationName,
      relationType: this.data.relationType,
      relationPhone: this.data.relationPhone
    }
    wx.setStorageSync("userInfo", userData)
    console.log("注册保存用户信息", userData)

    wx.showToast({title:"注册成功",icon:"success"})
    setTimeout(()=>{
      wx.navigateTo({url:"/pages/login/login"})
    },1200)
  },
  goLogin(){
    wx.navigateTo({url:"/pages/login/login"})
  }
})

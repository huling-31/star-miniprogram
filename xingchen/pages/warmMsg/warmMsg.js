const app = getApp()
Page({
  data:{
    msgContent:"",
    messageList:[]
  },
  onShow(){
    //每次打开页面读取本地存储留言
    const list=wx.getStorageSync("warmMessageList")||[];
    this.setData({
      messageList:list
    })
  },
  onInput(e){
    this.setData({
      msgContent:e.detail.value
    })
  },
  submitMsg(){
    const text=this.data.msgContent.trim();
    if(!text){
      wx.showToast({title:"留言不能为空",icon:"none"})
      return;
    }
    let messageList=wx.getStorageSync("warmMessageList")||[];
    const now=new Date();
    const dateStr=`${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}`;
    messageList.push({
      date:dateStr,
      content:text
    })
    wx.setStorageSync("warmMessageList",messageList);
    this.setData({
      messageList,
      msgContent:"" //提交之后清空输入框
    })
    wx.showToast({title:"留言已保存！"})
  },
  goBack(){
    wx.navigateBack()
  }
})

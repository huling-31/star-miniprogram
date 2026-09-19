const app=getApp()
Page({
  data:{
    index:0,
    curItem:{},
    inputMsg:""
  },
  onLoad(opt){
    const idx=parseInt(opt.index);
    this.setData({index:idx});
    this.loadRecord(idx);
  },
  loadRecord(idx){
    const historyList=wx.getStorageSync("historyList")||[];
    const record=historyList[idx];
    //初始化留言数组（兼容旧数据）
    if(!record.relationMsgList){
      record.relationMsgList=[];
    }
    this.setData({curItem:record});
  },
  submitMsg(){
    const text=this.data.inputMsg.trim();
    if(!text){
      wx.showToast({title:"留言不能为空",icon:"none"});
      return;
    }
    const now=new Date();
    const timeStr=`${now.getFullYear()}/${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getDate().toString().padStart(2,'0')}`;
    const newMsg={
      time:timeStr,
      content:text
    };
    let historyList=wx.getStorageSync("historyList");
    historyList[this.data.index].relationMsgList.push(newMsg);
    wx.setStorageSync("historyList",historyList);
    wx.showToast({title:"留言提交成功",icon:"success"});
    this.setData({inputMsg:""});
    this.loadRecord(this.data.index);
  },
  viewFullReport(){
    wx.showToast({title:"完整报告为本页分析内容",icon:"none"});
  },
  scrollToMsg(){
    wx.pageScrollTo({
      scrollTop:700
    })
  }
})

// pages/xiugaishouji/xiugaishouji.js
var interval = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showzezao:false,
    time:'获取验证码',
    currentTime: 61,
    showzezao2:false,
    showzezao3:false
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  showzz:function(){
    this.setData({
      showzezao:true
    })
  },
  next1:function(){
    this.setData({
      showzezao: false,
      showzezao2:true
    })
  },
  next2:function(){
    this.setData({
      showzezao: false,
      showzezao2: false,
      showzezao3:true
    })
    setTimeout(function () {
      wx.switchTab({
        url: '../user/user',
      })
    }, 1500);
  }
})
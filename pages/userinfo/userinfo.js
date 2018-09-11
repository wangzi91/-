// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
    var user = wx.getStorageSync("user")
    this.setData({
      userinfo :user,
    })
    this.setData({
      nickname: this.data.userinfo.nickName,
      images: this.data.userinfo.image,
      phone: '15566806262'
    })
    console.log(this.data.nickname)
  },
  gopaypwd:function(){
wx.navigateTo({
  url: '../payPassword/payPassword',
})
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
  xiugaishouji:function(){
    wx.navigateTo({
      url: '../xiugaishouji/xiugaishouji',
    })
  },
  goabout:function(){
    wx.navigateTo({
      url: '../about/about',
    })
  }
})
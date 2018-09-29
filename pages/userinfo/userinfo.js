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
    var phone = wx.getStorageSync("phone")
    this.setData({
      userinfo :user,
      phone:phone
    })

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
    wx.showToast({
      title: '暂未开通！',
      icon:'loading',
      duration:1500
    })
    // wx.navigateTo({
    //   url: '../xiugaishouji/xiugaishouji',
    // })
  },
  goabout:function(){
    wx.navigateTo({
      url: '../about/about',
    })
  }
})
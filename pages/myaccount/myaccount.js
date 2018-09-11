// pages/myaccount/myaccount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userDetail: [],
    ketixian:'0.00'
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
    var userDetail = wx.getStorageSync('userDetail')
    this.setData({
      userDetail: userDetail
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
  gorecharge:function(){
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },
  gowithdraw:function(){
    wx.navigateTo({
      url: '../withdraw/withdraw',
    })
  },
  gotradingRecord:function(){
    wx.navigateTo({
      url: '../tradingRecord/tradingRecord',
    })
  }
})
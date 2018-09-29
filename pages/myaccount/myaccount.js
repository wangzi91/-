// pages/myaccount/myaccount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // userDetail: [],
    // ketixian:'0.00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  gopaypwd: function () {
    wx.navigateTo({
      url: '../payPassword/payPassword',
    })
  },
  onLoad: function (options) {
    var uid = wx.getStorageSync('userid')
    var that = this
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getMineAccount.php',
      data: {
        'function': 'getMineAccount',
        uid: uid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        that.setData({
          yue: res.data.account_balance,
          ketixianyue: res.data.current_withdraw_cash,
          jifen: res.data.rest_reward_points
        })
      }
    })
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
    // var userDetail = wx.getStorageSync('userDetail')
    // this.setData({
    //   userDetail: userDetail
    // })
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
  },
  gowithrawal: function () {
    wx.navigateTo({
      url: '../withdrawalRecord/withdrawalRecord',
    })
  },
})
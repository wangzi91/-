// pages/withdrawalRecord/withdrawalRecord.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  gowithdraw: function () {
    wx.navigateTo({
      url: '../withdraw/withdraw',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userid = wx.getStorageSync('userid');
    var that = this;
    wx.request({
      url: app.globalData.httpsUrl +'/mp/getRecharge.php',
      method: 'POST',
      data: {
        'function': 'getRecharge',
        uid: userid,

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'

      },
      success: function (res) {
        console.log(res);
        that.setData({
          txjl:res.data
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

  }
})
// pages/payPassword/payPassword.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  gouser: function() {
    var pwd1 = this.data.pwd1

    var pwd2 = this.data.pwd2
    console.log(pwd1)
    if (pwd1 != pwd2) {
      wx.showToast({
        title: '密码不一致！',
        icon: 'loading',
        duration: 2000
      })
      return false
    }
    if (!pwd1) {

      wx.showToast({
        title: '请输入密码！',
        icon: 'loading',
        duration: 2000
      })
      return false
    }
    if (!pwd2) {
      wx.showToast({
        title: '请输入密码！',
        icon: 'loading',
        duration: 2000
      })
      return false
    }
    var that = this
    var uid = wx.getStorageSync('userid')
    wx.request({
      url: app.globalData.httpsUrl +'/mp/getMineAccount.php',
      data: {
        'function': 'getPayPassword',
        id: uid,
        pwd1: that.data.pwd1,
        pwd2: that.data.pwd2
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            duration: 1500
          })
          wx.switchTab({
            url: '../user/user',
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            duration: 1500
          })
          return false
        }

      }
    })

  },
  pwd1: function(e) {
    this.setData({
      pwd1: e.detail.value
    })
  },
  pwd2: function(e) {
    this.setData({
      pwd2: e.detail.value
    })
  }
})
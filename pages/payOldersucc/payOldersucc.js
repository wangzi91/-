// pages/tradesucc/tradesucc.js
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
  onLoad: function (options) {
    var id = options.id;
    console.log(id)
    var that = this
    wx.request({
      url: app.globalData.httpsUrl +'/mp/getOrder.php',
      data: {
        'function': 'getOrderCompleteAddress',
        id: id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        that.setData({
          addr: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  gopingjia: function () {
    wx.navigateTo({
      url: '../evaluate/evaluate',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */

  godetail: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
    wx.request({
      url: app.globalData.httpsUrl +'/mp/getMine.php',
      data: {
        'function': 'getMineFooterAdd',
        id: id,
        uid: this.data.uid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        // that.setData({
        //   xiaomi3: res.data
        // })
      }
    })
  },
  onShow: function () {

    var uid = wx.getStorageSync('userid')
    this.setData({
      uid: uid
    })
   
    var that = this
    wx.request({
      url: app.globalData.httpsUrl +'/mp/getMine.php',
      data: {
        'function': 'getMineLike',
        uid: that.data.uid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        that.setData({
          guess: res.data
        })
      }
    })
    // wx.request({
    //   url: 'https://sale.heliangwang.com/mp/getOrderAdd.php',
    //   data: {
    //     'function': 'getReturnBoard',
    //     uid: that.data.uid,
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   method: 'POST',
    //   success: function (res) {
    //     console.log(res)
    //     if (res.data.code == 0) {
    //       that.setData({
    //         msg: res.data.message
    //       })
    //     }

    //   }
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

  }
})
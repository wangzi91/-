// pages/daizhifu/daizhifu.js
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
    var yhuid = wx.getStorageSync('userid')
    this.setData({
      uid: yhuid
    })
    var that = this
    var uid = this.data.uid
    console.log('uid:' + uid)
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getOrder.php',
      data: {
        'function': 'getOrderPendingPay',
        uid: uid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          daizhifu: res.data
        })
        console.log(res.data)
      }
    })
  },
  //取消订单
  quxiaodingdan: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getOrder.php',
      data: {
        'function': 'getOrderCancel',
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '是否取消订单？',
          success: function (res2) {
            if (res2.confirm) {
              if (res.data.code == 0) {
                wx.showToast({
                  title: res.data.msg,
                  time: 1500
                })
              }
              if (res.data.code == 1) {
                wx.showToast({
                  title: res.data.msg,
                  time: 1500
                })
                return false
              }
            } else if (res2.cancel) {
              console.log('用户点击取消')
            }
          }
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
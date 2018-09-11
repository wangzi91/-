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
        'function': 'getOrderComment',
        uid: uid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          daipingjia: res.data
        })
        console.log(res.data)
      }
    })
  },
  delorder: function (e) {
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    var that = this
    console.log(index)
    var daipingjia = this.data.daipingjia
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://sale.heliangwang.com/mp/getOrder.php',
            data: {
              'function': 'getOrderDel',
              id: id
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
              if (res.data.code == 0) {
                daipingjia.splice(index, 1)
                wx.showToast({
                  title: res.data.msg,
                  time: 1500
                })
                that.setData({
                  daipingjia: daipingjia
                })
              }
              if (res.data.code == 1) {
                wx.showToast({
                  title: res.data.msg,
                  time: 1500
                })
                return false
              }
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
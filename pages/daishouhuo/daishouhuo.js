// pages/daizhifu/daizhifu.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goqrsh: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.showModal({
      title: '提示',
      content: '是否确认收货？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          // wx.navigateTo({
          //   url: '../waitsh/waitsh?id='+ id,
          // })
          wx.request({
            url: app.globalData.httpsUrl+'/mp/getOrder.php',
            data: {
              'function': 'getOrderConfirm',
              id: id
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              if (res.data.code == 0) {
                wx.navigateTo({
                  url: '../waitsh/waitsh?id=' + id,
                })
              }
              // that.setData({
              //   daizhifu: res.data
              // })
              // console.log(res.data)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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
      url: app.globalData.httpsUrl +'/mp/getOrder.php',
      data: {
        'function': 'getOrderReceipt',
        uid: uid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          daishouhuo: res.data
        })
        console.log(res.data)
      }
    })
  },
  gowuliu: function (e) {
    console.log(e)
    var olderNumber = e.currentTarget.dataset.dh
    var id = e.currentTarget.dataset.id
    var wlgs = e.currentTarget.dataset.wlgs
    wx.navigateTo({
      url: '../Logistics/Logistics?olderNumber=' + olderNumber + '&id=' + id + '&wlgs=' + wlgs
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
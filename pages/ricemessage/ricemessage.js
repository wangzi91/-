// pages/ricemessage/ricemessage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messagelist:[
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //梁讯列表
    wx.request({
      url: app.globalData.httpsUrl +'/mp/getMessage.php',
      data: {
        'function': 'getMessageList'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        // that.setData({
        //   imgUrls: res.data
        // })
        that.setData({
          messagelist: res.data
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
  
  },
  gomessdetail:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../messagedetails/messagedetails?id='+id,
    })
    
  }
})
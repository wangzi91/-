// pages/messagedetails/messagedetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messagedetail: [

    ],
    messagedetailImg: [

    ],
    messdetails: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var that = this
//获取梁讯详情
    var id = e.id
    console.log(id);
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getMessage.php',
      data: {
        'function': 'getMessageContent',
        id:id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.ContentImg_result)
        // that.setData({
        //   imgUrls: res.data
        // })
        that.setData({
          // messdetails: res.data,
          messagedetailImg: res.data.ContentImg_result
        })
      }
    })
    
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

  }
})
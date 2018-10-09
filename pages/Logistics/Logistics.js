// pages/Logistics/Logistics.js
const app = getApp()
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
    var that = this
    console.log(options)
    var olderNumber = options.olderNumber
    var id = options.id
    var wlgs = options.wlgs

    wx.request({
      url: app.globalData.httpsUrl +'/mp/getKdLogistics.php',
      data: {
        'function': 'getKdApi',
        id:id,
        kd: wlgs,
        pe: olderNumber

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        
        var jsonStr = res.data;
        jsonStr = jsonStr.replace(" "," ");
        if(typeof jsonStr != 'object'){
          jsonStr = jsonStr.replace(/\ufeff/g,"");
          var jj = JSON.parse(jsonStr);
          res.data = jj
        }
        console.log(res.data)
        that.setData({
          wuliu: res.data,
          traces: res.data.Traces.reverse()
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
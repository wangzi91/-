// pages/home/home.js
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {

    curNav: 1,
    curIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log("可使用高度 = " + res.windowHeight + " , 屏幕高度 = " + res.screenHeight);
        that.setData({
          deviceHeight: res.windowHeight
        })
      },
      fail: function (res) {

      }
    })
    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/goodstype/typebrandList',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          classifyList: res.data,

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

  switchLeftTab: function (e) {
    console.log(e);
    var index = e.target.dataset.index;
    this.setData({
      curNav: this.data.classifyList[index].id,
      curIndex: index,
      scrolltop: 0
    })
  },
  godetail:function(e){
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    })
  }
})
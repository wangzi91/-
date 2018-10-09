// pages/home/home.js
var app = getApp();
// var classify = require('../../utils/classify.js')


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
      url: app.globalData.httpsUrl+'/mp/getCommodityRelated.php',
      method: 'POST',
      data: {
        'function':'getCommodityCategory'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
        
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          classifyList: res.data

        })
      }
    })
    // this.setData({
    //   classifyList: classify.classifyList,
    // })
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
    var uid = wx.getStorageSync('userid')
    this.setData({
      uid: uid
    })
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
    return {
      title: '壹粟一生商城',
      path: '/index/index?id=123'
    }
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
  goclassify:function(e){
    console.log(e);
    var id = e.target.dataset.id;
    var name = e.target.dataset.name;
    wx.navigateTo({
      url: '../riceclassify/riceclassify?id=' + id +'&name='+ name,
    })
  },
  godetail:function(e){
    var id = e.target.dataset.idx;
    console.log(id)
    // wx.navigateTo({
    //   url: '../detail/detail?id=' + id
    // })

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
      }
    })
  }

})
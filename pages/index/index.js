//index.js
//获取应用实例
var nav = require('../../utils/mock.js')

var remai = require('../../utils/remai.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    //轮播
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getImage.php',
      data: {
        'function': 'getImage'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        that.setData({
          imgUrls: res.data
        })
      }
    })
//梁讯index
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getMessage.php',
      data: {
        'function': 'getMessageIndex'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        that.setData({
          ricedetail: res.data
        })
      }
    })
    //品牌推荐
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getCommodityRelated.php',
      data: {
        'function': 'getCommodityBrand'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        that.setData({
          tuijian: res.data
        })
      }
    })
    //r热卖
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getCommodityRelated.php',
      data: {
        'function': 'getCommodityHot'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        that.setData({
          remai: res.data
        })
      }
    })
    this.setData({
      navshow: nav.navlist,
    })
    console.log(this.data.navshow)
    console.log(this.data.tuijian)
  },

  onReachBottom:function(){
    console.log(1)
  },
  gosearch:function(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  goricemessage:function(){
    wx.navigateTo({
      url: '../ricemessage/ricemessage',
    })
  },
  gomessagedetail:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../messagedetails/messagedetails?id='+id,
    })
  },
  gomainrice:function(){
    wx.navigateTo({
      url: '../ricemain/ricemain',
    })
  },
  godetail:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    })
  },
  golist:function(){
    wx.navigateTo({
      url: '../myorder/myorder',
    })
  },
  gofenxiao:function(){
    wx.navigateTo({
      url: '../fenxiao/fenxiao',
    })
  },
  goclassify:function(){
wx.switchTab({
  url: '../classify2/classify2',
})

  },
  goliangxun:function(){
    wx.navigateTo({
      url: '../ricemessage/ricemessage',
    })
  }
})

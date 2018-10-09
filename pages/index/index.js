//index.js
//获取应用实例

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  onShareAppMessage: function () {
    return {
      title: '壹粟一生商城',
      path: '/pages/index/index?id=123'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this
    //广告
    wx.request({
      url: app.globalData.httpsUrl+'/mp/getImage.php',
      data: {
        'function': 'getAdv'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        that.setData({
          guanggao: res.data
        })
      }
    })
    //轮播
    wx.request({
      url: app.globalData.httpsUrl +'/mp/getImage.php',
      data: {
        'function': 'getImage'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
 
        that.setData({
          imgUrls: res.data
        })
      }
    })
    //梁讯index
    wx.request({
      url: app.globalData.httpsUrl +'/mp/getMessage.php',
      data: {
        'function': 'getMessageIndex'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
 console.log(res)
        that.setData({
          ricedetail: res.data
        })
      }
    })
    //品牌推荐
    wx.request({
      url: app.globalData.httpsUrl +'/mp/getCommodityRelated.php',
      data: {
        'function': 'getCommodityBrand'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
  
        that.setData({
          tuijian: res.data
        })
      }
    })
    //r热卖
    wx.request({
      url: app.globalData.httpsUrl +'/mp/getCommodityRelated.php',
      data: {
        'function': 'getCommodityHot'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
     
        that.setData({
          remai: res.data
        })
      }
    })
    // this.setData({
    //   navshow: nav.navlist,
    // })

  },

  onReachBottom: function() {

  },
  gosearch: function() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  goricemessage: function() {
    wx.navigateTo({
      url: '../ricemessage/ricemessage',
    })
  },
  gomessagedetail: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../messagedetails/messagedetails?id=' + id,
    })
  },
  gomainrice: function() {
    wx.navigateTo({
      url: '../ricemain/ricemain',
    })
  },
  gozaliang: function() {
    wx.navigateTo({
      url: '../zaliang/zaliang',
    })
  },
  onShow: function () {
    var uid = wx.getStorageSync('userid')
    this.setData({
      uid: uid
    })
  },
  godetail: function(e) {
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
  golist: function() {
    wx.navigateTo({
      url: '../myorder/myorder',
    })
  },
  gofenxiao: function() {
    // wx.navigateTo({
    //   url: '../fenxiao/fenxiao',
    // })
    wx.showToast({
      title: '开发中！',
      icon: 'loading'
    })
  },
  goclassify: function() {
    wx.switchTab({
      url: '../classify2/classify2',
    })

  },
  gofushi:function(){
    wx.navigateTo({
      url: '../fushi/fushi',
    })
    // wx.showToast({
    //   title: '暂无商品！',
    //   icon: 'loading'
    // })
  },
  goliangxun: function() {
    wx.navigateTo({
      url: '../ricemessage/ricemessage',
    })
  },
  gotiaowei:function(){
    wx.showToast({
      title: '暂无商品！',
      icon: 'loading'
    })
  }
})
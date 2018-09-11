// pages/riceclassify/riceclassify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['销量排序', '价格排序'],
    currentTab: 0,
    xiaolaing:[],
    jiage:[]
  },
  godetail: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },
  navbarTap: function (e) {
    var that = this
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    //价格排序
    if (this.data.currentTab == 1){
      wx.request({
        url: 'https://sale.heliangwang.com/mp/getCommodityRelated.php',
        data: {
          'function': 'getCommodityPrice',
          id: that.data.id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          that.setData({
            jiage: res.data
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this
    var idx = e.id
    var name = e.name
    console.log(idx)
    this.setData({
      id:idx
    })
    // wx.request({
    //   url: 'https://sale.heliangwang.com/mp/getCommodityRelated.php',
    //   data: {
    //     'function': 'getCommodityUnique',
    //     id:idx
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   method: 'POST',
    //   success: function (res) {
    //     console.log(res)
    //     that.setData({
    //       rice: res.data
    //     })
    //     wx.setNavigationBarTitle({
    //       title: name
    //     })
    //   }
    // })
    //默认销量排序
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getCommodityRelated.php',
      data: {
        'function': 'getCommoditySales',
        id: idx
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        that.setData({
          rice: res.data
        })
        wx.setNavigationBarTitle({
          title: name
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
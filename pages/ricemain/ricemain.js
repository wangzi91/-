var app = getApp()
Page({
  data: {
    navbar: ['大米', '小米'],
    currentTab: 0,
    navbar2: ['销量排序', '价格排序'],
    currentTab2: 0,
    currentTab3: 0,
  },
  onShow: function() {
    var userid = wx.getStorageSync('userid')
    this.setData({
      uid: userid
    })
  },
  navbarTap2: function(e) {
    var that = this
    this.setData({
      currentTab2: e.currentTarget.dataset.idx
    })
    //价格排序
    if (this.data.currentTab2 == 1) {
      wx.request({
        url: 'https://sale.heliangwang.com/mp/getCommodityRelated.php',
        data: {
          'function': 'getCommodityPrice',
          id: 5
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          console.log(res.data)
          that.setData({
            dami2: res.data
          })
        }
      })
    }
  },
  navbarTap3: function(e) {
    var that = this
    this.setData({
      currentTab3: e.currentTarget.dataset.idx
    })
    //价格排序
    if (this.data.currentTab3 == 1) {
      wx.request({
        url: 'https://sale.heliangwang.com/mp/getCommodityRelated.php',
        data: {
          'function': 'getCommodityPrice',
          id: 6
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          console.log(res.data)
          that.setData({
            xiaomi3: res.data
          })
        }
      })
    }
  },
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    if (this.data.currentTab == 0) {
      var that = this
      wx.request({
        url: 'https://sale.heliangwang.com/mp/getCommodityRelated.php',
        method: 'POST',
        data: {
          'function': 'getCommodityCategory'
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'

        },
        success: function(res) {
          console.log(res.data)
          that.setData({
            dami: res.data[0].children[0].children
          })
        }
      })
    }
    if (this.data.currentTab == 1) {
      var that = this
      wx.request({
        url: 'https://sale.heliangwang.com/mp/getCommodityRelated.php',
        method: 'POST',
        data: {
          'function': 'getCommodityCategory'
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'

        },
        success: function(res) {
          console.log(res.data[0].children[1].children)
          that.setData({
            xiaomi: res.data[0].children[1].children
          })
        }
      })
    }
  },
  godetail: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
    console.log(this.data.uid)
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getMine.php',
      data: {
        'function': 'getMineFooterAdd',
        id: id,
        uid: this.data.uid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        // that.setData({
        //   xiaomi3: res.data
        // })
      }
    })

  },
  onLoad: function() {
    var that = this
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getCommodityRelated.php',
      method: 'POST',
      data: {
        'function': 'getCommoditySales',
        id:5
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'

      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          dami: res.data
        })
      }
    })
  }
})
var app = getApp()
Page({
  data: {
    navbar: ['热门搜索', '最近搜索'],
    currentTab: 0,
    remen: [],
    searchItem: [],
    searchItem2: [],
    zuijin: [],
    placeholder: '搜索商品',
    val: ''
  },
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  godetail: function(e) {
    var id = e.currentTarget.dataset.idx
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    })
  },
  //搜索
  search: function() {
    if (this.data.currentTab == 0) {
      var that = this
      var keyWord = this.data.keyWords
      console.log('关键字:' + keyWord)
      if (keyWord == undefined) {
        wx.showToast({
          title: '请输入关键字',
          icon: 'loading',
          duration: 1000
        })
        return false
      }
      wx.request({
        url: 'https://sale.heliangwang.com/mp/getCommodityRelated.php',
        data: {
          keyword: keyWord,
          'function': 'getCommoditySearch'
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          console.log(res)
          that.setData({
            searchItem: res.data
          })
        }
      })
    }
    if (this.data.currentTab == 1) {
      var that = this
      var keyWord = this.data.keyWords
      console.log('关键字:' + keyWord)
      if (keyWord == undefined) {
        wx.showToast({
          title: '请输入关键字',
          icon: 'loading',
          duration: 1000
        })
        return false
      }
      wx.request({
        url: 'https://sale.heliangwang.com/mp/getCommodityRelated.php',
        data: {
          keyword: keyWord,
          'function': 'getCommoditySearch'
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          that.setData({
            searchItem2: res.data
          })
        }
      })
    }

    this.zuijinwuge();
  },
  //最近搜索
  zuijinwuge: function() {
    var that = this
    var keyWord = this.data.keyWords
    var recent = wx.getStorageSync('recent')
    if (recent == '') {
      wx.setStorageSync('recent', keyWord)
      var recent = []
      recent.push(keyWord)
      wx.setStorageSync('recent', recent)
    } else {
      recent.unshift(keyWord)
      if (recent.length > 5) {
        recent.splice(5, recent.length - 5)
        console.log(recent)
        var newsea = wx.setStorageSync('recent', recent)
      }
      var newsea = wx.setStorageSync('recent', recent)
    }
    this.setData({
      zuijin: recent
    })


  },
  //获取搜索关键字
  searchGoods: function(e) {
    var searchValue = e.detail.value
    console.log(searchValue)
    this.setData({
      keyWords: searchValue
    })
  },
  onShow: function() {
    var newsearch = wx.getStorageSync('recent')
    this.setData({
      zuijin: newsearch
    })
  },
  onLoad: function() {

    var that = this
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getCommodityRelated.php',
      data: {
        'function': 'getCommodityKeyword'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data.popularSearch_result)
        that.setData({
          remen: res.data.popularSearch_result
        })
      }
    })
  },
  //热门
  remenss: function(e) {
    var that = this
    var value = e.currentTarget.dataset.value
    console.log(value)
    this.setData({
      keyWords: value,
      val: value
    })
  },
  remenss2: function(e) {
    var that = this
    var value = e.currentTarget.dataset.value
    console.log(value)
    this.setData({
      keyWords: value,
      val: value
    })
  },



})
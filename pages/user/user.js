// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: true,
    nickname: '',
    unid: '',
    info: [],
    balance: '',
    showquanyi:true
  },
  showmyquanyi:function(){
    this.setData({
      showquanyi: !this.data.showquanyi
    })
  },
  gocollect: function() {
    wx.navigateTo({
      url: '../collect/collect',
    })
  },
  gofankui: function() {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  gofenxiao: function() {
    wx.navigateTo({
      url: '../fenxiao/fenxiao',
    })
  },
  onLoad: function(options) {
    var url = decodeURIComponent(options.q)
    var loc = url.substring(url.lastIndexOf('=') + 1, url.length);
    console.log('传递值为' + loc)
    this.setData({
      wxcode: loc
    })
    // var unionid = wx.getStorageSync('unionid')
    // this.setData({
    //   unid: unionid
    // })
    //  console.log(this.data.unid)
    // if (!unionid) {
    //   wx.redirectTo({
    //     url: '../login/login?TDChannelId=' + this.data.wxcode,
    //   })
    // }
  },
  onShow: function() {
    var unionid = wx.getStorageSync('unionid')
    // this.setData({
    //   unid: unionid
    // })
    //  console.log(this.data.unid)
    if (!unionid) {
      wx.redirectTo({
        url: '../login/login?TDChannelId=' + this.data.wxcode,
      })
    }
    var that = this
    var uid = wx.getStorageSync('userid')
    var userinfo = wx.getStorageSync('user')
    var balance = wx.getStorageSync('balance')
    var phone = wx.getStorageSync('phone')
    this.setData({
      info: userinfo
    })
    this.setData({
      balance: balance
    })
    this.setData({
      phone: phone
    })
    //等级
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getRecharge.php',
      data: {
        'function': 'getLevel',
        uid: uid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
that.setData({
  quanyiimg:res.data
})
      }
    })
    //余额
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getMineAccount.php',
      data: {
        'function': 'getMineAccount',
        uid: uid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        that.setData({
          yue: res.data.account_balance,
          ketixianyue: res.data.current_withdraw_cash,
          jifen: res.data.rest_reward_points
        })
      }
    })

  },
  goorderlist: function() {
    wx.navigateTo({
      url: '../myorder/myorder',
    })

  },
  goorderlist: function() {
    wx.navigateTo({
      url: '../myorder/myorder',
    })
  },
  gomyaccount: function() {
    wx.navigateTo({
      url: '../myaccount/myaccount',
    })
  },

  quit: function() {
    wx.showModal({
      title: '提示',
      content: '是否退清除',
      success: function(res) {
        if (res.confirm) {
          wx.removeStorageSync("unionid")
          wx.switchTab({
            url: '../index/index',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  clearaddr: function() {

    wx.removeStorageSync("addr")
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  },
  clearcart: function() {
    wx.removeStorageSync("cartItems")
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  },
  addr: function() {
    var that = this;
    wx.chooseAddress({
      success: function(res) {
        that.setData({
          "add_userName": res.userName,
          "add_telNumber": res.telNumber,
          "add_provinceName": res.provinceName,
          "add_cityName": res.cityName,
          "add_countyName": res.countyName,
          "add_detailInfo": res.detailInfo,
          "add_postalCode": res.postalCode,
        })
        var addr = {
          userName: that.data.add_userName,
          telNumber: that.data.add_telNumber,
          provinceName: that.data.add_provinceName,
          cityName: that.data.add_cityName,
          countyName: that.data.add_countyName,
          detailInfo: that.data.add_detailInfo,
          postalCode: that.data.add_postalCode,
        }
        wx.setStorageSync('addr', addr)
      }
    })


  },
  godaizhifu: function(e) {

    wx.navigateTo({
      url: '../daizhifu/daizhifu'
    })
  },
  gouserinfo: function() {
    wx.navigateTo({
      url: '../userinfo/userinfo'
    })
  },
  // show: function() {
  //   wx.showToast({
  //     title: '别点了，没用！',
  //     icon: 'loading',
  //     duration: 1000
  //   })
  // },
  godaishouhuo: function() {
    wx.navigateTo({
      url: '../daishouhuo/daishouhuo'
    })
  },
  godaipingjia: function() {
    wx.navigateTo({
      url: '../daipingjia/daipingjia'
    })
  },
  goyiwancheng: function() {
    wx.navigateTo({
      url: '../yiwancheng/yiwancheng'
    })
  },
  gofoot: function() {
    wx.navigateTo({
      url: '../footMark/footMark'
    })
  }
})
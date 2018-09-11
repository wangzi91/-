// pages/conofirmorder/conofirmorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: true,
    js: 0,
    // inaddr:false,
    // unaddr:true

    items: [{
        name: '0',
        value: '余额支付'
      },
      {
        name: '1',
        value: '微信支付',
        // checked: 'true'
      },
    ],
    showjifen:false
  },
  integral: function(e) {
    console.log('积分按钮值为', e.detail.value)
    if (e.detail.value) {
      this.setData({
        showjifen:true
      })
    }else{
      this.setData({
        showjifen: false
      })
    }
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      values: e.detail.value
    })
  },
  onLoad: function(e) {

    var phone = wx.getSystemInfoSync(); //调用方法获取机型
    console.log(phone)
    if (phone.platform == 'ios') {
      this.setData({
        detail: true
      })
    } else if (phone.platform == 'android') {
      this.setData({
        detail: false
      })

    }

  },
  onShow: function() {
    var that = this
    var addr = wx.getStorageSync('addr')
    // var selarr = wx.getStorageSync('selarr')
    var uid = wx.getStorageSync('userid')
    var bs = wx.getStorageSync('bs')
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getOrderAdd.php',
      data: {
        'function': 'getShowOrderCar',
        uid: uid,
        bs: bs
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        that.setData({
          selarr: res.data.show,
          total: res.data.sellar
        })
      }
    })
    if (addr) {
      this.setData({
        addr: addr,
        unaddr: false,
        inaddr: true,
        inaddr2: false,

      })
    } else {
      this.setData({
        unaddr: true,
        inaddr: false,
        inaddr2: false,

      })
    }
  },
  chooseaddr: function() {
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
          inaddr2: true,
          inaddr: false,
          unaddr: false
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
  asd: function() {
    console.log(this.data.values)
    if (this.data.values == 0) {
      wx.showToast({
        title: "余额支付",
        duration: 1000
      })
    }
    if (this.data.values == 1) {
      wx.showToast({
        title: "暂未开通",
        icon: 'loading',
        duration: 1000
      })
      return false
    }
    if (!this.data.values) {
      wx.showToast({
        title: "请选择支付方式",
        icon: 'loading',
        duration: 1000
      })
      return false
    }
    if (this.data.unaddr == true) {
      wx.showToast({
        title: '请填写收货地址',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      return false
    } else {
      // setTimeout(function() {
      //   wx.navigateTo({
      //     url: '../tradesucc/tradesucc',
      //   })
      // }, 1500)
    }
  }
})
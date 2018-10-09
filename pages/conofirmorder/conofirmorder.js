// pages/conofirmorder/conofirmorder.js
const app = getApp();
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
      // {
      //   name: '1',
      //   value: '微信支付',
      //   // checked: 'true'
      // },
    ],
    showjifen: false,
    total: '',
    showpay: false,
    con:'',
    showtear:true
  },
  //是否使用积分
  integral: function(e) {
    var that = this

    var uid = wx.getStorageSync('userid')
    var bs = wx.getStorageSync('bs')
    var usejifen = e.detail.value
    this.setData({
      usejifen: usejifen
    })
    console.log('积分按钮值为', this.data.usejifen)
    if (e.detail.value) {
      this.setData({
        showjifen: true
      })
      wx.request({
        url: app.globalData.httpsUrl+'/mp/getOrderAdd.php',
        method: 'POST',
        data: {
          'function': 'getPoint',
          uid: uid,
          amount: that.data.total
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'

        },
        success: function(res) {
          console.log(res)
          that.setData({
            msg: res.data.msg,
            total: res.data.amount,
            jifen: res.data.point,
            zexianjine: res.data.pointcredit
          })
        }
      })
    } else {
      wx.request({
        url: app.globalData.httpsUrl +'/mp/getOrderAdd.php',
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
            total: res.data.sellar
          })
        }
      })
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
  gozezhao: function() {
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
    this.setData({
      showpay: true,
      showtear:false
    })
  },
  quxiao: function() {
    this.setData({
      showpay: false,
      showtear: true
    })
  },
  onShow: function() {
    var that = this
    var addr = wx.getStorageSync('addr')
    // var selarr = wx.getStorageSync('selarr')
    var uid = wx.getStorageSync('userid')
    var bs = wx.getStorageSync('bs')
    wx.request({
      url: app.globalData.httpsUrl +'/mp/getOrderAdd.php',
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
  //获取支付密码
  zhifumima: function(e) {
    this.setData({
      zfmm: e.detail.value
    })
    console.log(this.data.zfmm)
  },
  //获取留言
  bindWordLimit: function(e) {
    this.setData({
      con: e.detail.value
    })
    console.log(this.data.con)
  },
  asd: function() {
    var that = this
    var uid = wx.getStorageSync('userid')
    console.log(uid)
    var addr = this.data.addr
    //金额
    var total = this.data.total
    //姓名
    var name = addr.userName
    //是否使用积分
    var usejifen = this.data.usejifen
    //电话
    var phone = addr.telNumber
    //地址
    var address = addr.provinceName + addr.cityName + addr.countyName + addr.detailInfo
    console.log(address)
    var cartItems = this.data.selarr
    //支付密码
    var zfmima = this.data.zfmm
    if (!zfmima) {
      wx.showToast({
        title: '请输入密码',
        icon: 'loading'
      })
      return false
    }
    //留言
    var liuyan = this.data.con
    var arrsel2 = []
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].selected == true) {
        arrsel2.push({
          id: cartItems[i].goods_id,
          value: cartItems[i].value,
          price: cartItems[i].price,
          origin: cartItems[i].place_of_origin
        })
      }
    }
    //商品对象
    var jarr2 = JSON.stringify(arrsel2)
    console.log(jarr2)
    //余额支付
    if (this.data.values == 0) {
      wx.request({
        url: app.globalData.httpsUrl +'/mp/getOrderAdd.php',
        data: {
          'function': 'getAdding',
          uid: uid,
          pwd: zfmima,
          name: name,
          phone: phone,
          address: address,
          amount: total,
          ptype: 0,
          message: liuyan,
          pointbs: usejifen,
          pointcredit: that.data.zexianjine,
          point: that.data.jifen,
          data: jarr2
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          console.log(res)
          if (res.data.code != 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'loading'
            })
            that.setData({
              showpay: false
            })
            return false
          } else {
            that.setData({
              showpay:false,
              showtear: true
            })
            wx.showToast({
              title: res.data.msg,
            })
            wx.navigateTo({
              url: '../tradesucc/tradesucc',
            })
          }
        }
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

  }
})
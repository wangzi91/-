// pages/login/login.js
var interval = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '获取验证码',
    currentTime: 61,
    phonenum: '',
    yzm: ''
  },

  onLoad: function(options) {
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {}
          })
        }
      }
    })
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
  phonevalue: function(e) {
    var phone = e.detail.value
    console.log(phone)
    this.setData({
      phonenum: phone
    })
  },
  yzmvalue: function(e) {
    var yzm = e.detail.value
    console.log(yzm)
    this.setData({
      yzm: yzm
    })
  },
  getCode: function(options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function() {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode() {
    var that = this
    if (this.data.phonenum == '') {
      wx.showToast({
        title: '请填写手机号',
        icon: 'loading',
        time: 1500
      })
      return false
    }


    wx.request({
      url: 'https://sale.heliangwang.com/mp/changePhone.php',
      data: {
        'function': "getPhoneCode",
        phone: that.data.phonenum

      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var jsonStr = res.data;
        jsonStr = jsonStr.replace(" ", "");
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
          var jj = JSON.parse(jsonStr);
          res.data = jj;
        }
        console.log(jj)
        if (jj.code == 0) {
          wx.showToast({
            title: jj.msg,
            time: 1500
          })
          that.getCode();
          that.setData({
            disabled: true,
            yzmid: jj.codeid
          })
        } else {
          wx.showToast({
            title: jj.msg,
            icon: 'loading',
            time: 1500
          })
          return false
        }
      }
    })

  },
  bindGetUserInfo: function(e) {


    if (this.data.phonenum == '') {
      wx.showToast({
        title: '请填写手机号',
        icon: 'loading',
        time: 1500
      })
      return false
    }

    if (this.data.yzm == '') {
      wx.showToast({
        title: '请填写验证码',
        icon: 'loading',
        time: 1500
      })
      return false
    }
    var that = this
    this.setData({
      nickName: e.detail.userInfo.nickName,
      image: e.detail.userInfo.avatarUrl,
    })
    var login = {
      nickName: this.data.nickName,
      image: this.data.image,
    }
    wx.setStorageSync("user", login)
    wx.login({
      success: function(res) {
        var _code = res.code;
        console.log(_code)
        if (_code) {
          wx.request({
            url: 'https://sale.heliangwang.com/mp/getUserinfo.php',
            data: {
              code: _code,
              'function': "getUserinfo",
              nickname: that.data.nickName,
              headimg: that.data.image,
              phone: that.data.phonenum,
              phonecode: that.data.yzm,
              codeid: that.data.yzmid
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              console.log(res)
              if (res.data.code == 0) {
                console.log(res.data.msg)
                wx.showToast({
                  title: res.data.msg,
                  time: 1500
                })
                that.setData({
                  balance: res.data.account_balance,
                  unid: res.data.unionid,
                  userid: res.data.user_id,
                  phone: res.data.phone
                })
                wx.setStorageSync('balance', that.data.balance)
                wx.setStorageSync('unionid', that.data.unid)
                wx.setStorageSync('phone', that.data.phone)
                wx.setStorageSync('userid', that.data.userid)
                wx.switchTab({
                  url: '../user/user',
                })
              }else{
                wx.showToast({
                  title: res.data.msg,
                  icon: 'loading',
                  time: 1500
                })
                return false
              }

            }
          })
        }
      }
    })

  },

  goindex: function() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  goquickRegister: function() {
    wx.navigateTo({
      url: '../quickRegister/quickRegister',
    })
  },
  show: function() {
    wx.showToast({
      title: '忘了就忘了吧！',
      icon: 'loading',
      duration: 1000
    })
  },
  godenglu: function() {
    wx.showToast({
      title: '去点微信登录！',
      icon: 'loading',
      duration: 1000
    })
  },
  gochangepwd: function() {
    wx.navigateTo({
      url: '../changePassword/changePassword',
    })
  }
})
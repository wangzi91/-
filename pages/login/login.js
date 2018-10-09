// pages/login/login.js
var interval = null
const app = getApp();
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
    //     var url = decodeURIComponent(options.q)
    //     var loc = url.substring(url.lastIndexOf('=') + 1, url.length);
    //     console.log('传递值为' + loc)
    // this.setData({
    //   wxcode:loc
    // })
var that = this
    var code = options.TDChannelId
console.log('传过来code'+  code)
    this.setData({
      code2: code
    })

    console.log(this.data.code)
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            withCredentials: true,
            success: function(res) {
              console.log(res)
              // that.setData({
              //   enc: res.data.encryptedData,
              //   iv:res.data.iv
              // })
            }
          })
        }
      }
    })
    // var phone = wx.getSystemInfoSync(); //调用方法获取机型
    // console.log(phone)
    // if (phone.platform == 'ios') {
    //   this.setData({
    //     detail: true
    //   })
    // } else if (phone.platform == 'android') {
    //   this.setData({
    //     detail: false
    //   })

    // }
  },
  phonevalue: function(e) {
    var phone = e.detail.value
 
    this.setData({
      phonenum: phone
    })
  },
  yzmvalue: function(e) {
    var yzm = e.detail.value
   
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
  getcode() {
    var that = this
    var phone = wx.getSystemInfoSync()
    if (this.data.phonenum == '') {
      wx.showToast({
        title: '请填写手机号',
        icon: 'loading',
        time: 1500
      })
      return false
    }
    wx.request({
      url: app.globalData.httpsUrl+'/mp/changePhone.php',
      data: {
        'function': "getPhoneCode",
        phone: that.data.phonenum

      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {

        // var jsonStr = res.data;
        // jsonStr = jsonStr.replace(" "," ");
        // if (typeof jsonStr != 'object') {
        //   jsonStr = jsonStr.replace(/\ufeff/g, "");
        //   var jj = JSON.parse(jsonStr);
        //   res.data = jj
        // }

        if (phone.platform == 'ios') {
          if (res.data.code == 0) {
            wx.showToast({
              title: res.data.msg,
              duration: 1500
            })

          } else {
            wx.showToast({
              title: res.data.msg,
              duration: 1500
            })
            return false
          }
        }
        if (phone.platform == 'android') {
          var jsonStr = res.data;
          jsonStr = jsonStr.replace(" ", " ");
          if (typeof jsonStr != 'object') {
            jsonStr = jsonStr.replace(/\ufeff/g, "");
            var jj = JSON.parse(jsonStr);
            res.data = jj
          }
        }
   
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            duration: 1500
          })

        } else {
          wx.showToast({
            title: res.data.msg,
            duration: 1500
          })
          return false
        }
        that.getCode();
        that.setData({
          disabled: true
        })
      }

    })

  },
  bindGetUserInfo: function(e) {
    console.log(e)
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
      enc: e.detail.encryptedData,
      iv: e.detail.iv
    })
    var login = {
      nickName: this.data.nickName,
      image: this.data.image,
    }
    wx.setStorageSync("user", login)
    wx.login({
      success: function(res) {
        var _code = res.code;
        console.log("code:"+_code)
        if (_code) {
          wx.request({
            url: app.globalData.httpsUrl +'/mp/getUserinfo.php',
            data: {
              code: _code,
              'function': "getUserinfo",
              nickname: that.data.nickName,
              headimg: that.data.image,
              phone: that.data.phonenum,
              phonecode: that.data.yzm,
              superior: that.data.code2,
              encryptedData:that.data.enc,
              iv:that.data.iv
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
                console.log(that.data.unid)
                wx.switchTab({
                  url: '../user/user',
                })
              } else {
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
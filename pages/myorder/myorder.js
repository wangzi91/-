const app = getApp()
Page({
  data: {
    navbar: ['全部', '待支付', '待收货', '待评价', '已完成'],
    currentTab: 0,
    show: false,
    daizhifu: [],
    daishouhuo: [],
    daipingjia: [],
    yiwancheng: [],
    showpay: false
    // none: '',
    // block: ' ',
    // none1:'',
    // block1:''
  },
  //获取支付密码
  zhifumima: function(e) {
    this.setData({
      zfmm: e.detail.value
    })
    console.log(this.data.zfmm)
  },
  asd: function() {
    var that = this
    wx.request({
      url: app.globalData.httpsUrl +'/mp/getOrder.php',
      data: {
        'function': 'getOrderPay',
        id: that.data.id,
        uid: that.data.uid,
        pwd: that.data.zfmm
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data)
        if (res.data.code == 0) {
          that.setData({
            showpay: false,
          })
          wx.navigateTo({
            url: '../payOldersucc/payOldersucc?id=' + that.data.id,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            duration: 1500,
            icon: 'loading'
          })
          return false
        }
      }
    })
  },
  quxiao: function() {
    this.setData({
      showpay: false
    })
  },
  showpay: function(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    this.setData({
      showpay: true,
      id: id
    })
  },
  goqrsh: function(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.showModal({
      title: '提示',
      content: '是否确认收货？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          // wx.navigateTo({
          //   url: '../waitsh/waitsh?id='+ id,
          // })
          wx.request({
            url: app.globalData.httpsUrl +'/mp/getOrder.php',
            data: {
              'function': 'getOrderConfirm',
              id: id
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function(res) {
              console.log(res)
              if (res.data.code == 0) {
                wx.navigateTo({
                  url: '../waitsh/waitsh?id=' + id,
                })
              }
              // that.setData({
              //   daizhifu: res.data
              // })
              // console.log(res.data)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    //待支付
    if (this.data.currentTab == 1) {
      console.log(1)
      var that = this
      var uid = this.data.uid
      console.log('uid:' + uid)
      wx.request({
        url: app.globalData.httpsUrl +'/mp/getOrder.php',
        data: {
          'function': 'getOrderPendingPay',
          uid: uid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          that.setData({
            daizhifu: res.data
          })
          console.log(res.data)
        }
      })
    }
    //代收货
    if (this.data.currentTab == 2) {
      console.log(2)
      var that = this
      var uid = this.data.uid
      console.log('uid:' + uid)
      wx.request({
        url: app.globalData.httpsUrl +'/mp/getOrder.php',
        data: {
          'function': 'getOrderReceipt',
          uid: uid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          that.setData({
            daishouhuo: res.data
          })
          console.log(res.data)
        }
      })
    }
    //待评价
    if (this.data.currentTab == 3) {
      console.log(3)
      var that = this
      var uid = this.data.uid
      console.log('uid:' + uid)
      wx.request({
        url: app.globalData.httpsUrl +'/mp/getOrder.php',
        data: {
          'function': 'getOrderComment',
          uid: uid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          that.setData({
            daipingjia: res.data
          })
          console.log(res.data)
        }
      })
    }
    //已完成
    if (this.data.currentTab == 4) {
      console.log(4)
      var that = this
      var uid = this.data.uid
      console.log('uid:' + uid)
      wx.request({
        url: app.globalData.httpsUrl +'/mp/getOrder.php',
        data: {
          'function': 'getOrderComplete',
          uid: uid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          that.setData({
            yiwancheng: res.data
          })
          console.log(res.data)
        }
      })
    }
  },
  godetail: function() {
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  onShow: function() {

  },
  //取消订单
  quxiaodingdan: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.request({
      url: app.globalData.httpsUrl +'/mp/getOrder.php',
      data: {
        'function': 'getOrderCancel',
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        wx.showModal({
          title: '提示',
          content: '是否取消订单？',
          success: function(res2) {
            if (res2.confirm) {
              if (res.data.code == 0) {
                wx.showToast({
                  title: res.data.msg,
                  time: 1500
                })
              }
              if (res.data.code == 1) {
                wx.showToast({
                  title: res.data.msg,
                  time: 1500
                })
                return false
              }
            } else if (res2.cancel) {
              console.log('用户点击取消')
            }
          }
        })

      }
    })
  },
  onLoad: function(e) {

    var that = this
    var disnone = 'disnone'
    var yhuid = wx.getStorageSync('userid')
    this.setData({
      uid: yhuid
    })
    //订单
    var uid = this.data.uid
    console.log('uid:' + uid)
    wx.request({
      url: app.globalData.httpsUrl +'/mp/getOrder.php',
      data: {
        'function': 'getAllOrder',
        uid: uid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        that.setData({
          allOrder: res.data
        })
        console.log(res.data)
      }
    })
  },
  gounpay: function() {
    wx.navigateTo({
      url: '../unpaid/unpaid',
    })
  },
  delorder: function(e) {
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    var that = this
    console.log(index)
    var daipingjia = this.data.daipingjia
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: app.globalData.httpsUrl +'/mp/getOrder.php',
            data: {
              'function': 'getOrderDel',
              id: id
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function(res) {
              if (res.data.code == 0) {
                daipingjia.splice(index, 1)
                wx.showToast({
                  title: res.data.msg,
                  time: 1500
                })
                that.setData({
                  daipingjia: daipingjia
                })
              }
              if (res.data.code == 1) {
                wx.showToast({
                  title: res.data.msg,
                  time: 1500
                })
                return false
              }
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  ywcdelorder: function(e) {
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    var that = this
    console.log(index)
    var yiwancheng = this.data.yiwancheng
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: app.globalData.httpsUrl +'/mp/getOrder.php',
            data: {
              'function': 'getOrderDel',
              id: id
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function(res) {
              if (res.data.code == 0) {
                yiwancheng.splice(index, 1)
                wx.showToast({
                  title: res.data.msg,
                  time: 1500
                })
                that.setData({
                  yiwancheng: yiwancheng
                })
              }
              if (res.data.code == 1) {
                wx.showToast({
                  title: res.data.msg,
                  time: 1500
                })
                return false
              }
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  qbdelorder2: function(e) {
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    var that = this
    console.log(index)
    var qbdelorder = this.data.allOrder
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function(res4) {
        if (res4.confirm) {
          console.log('用户点击确定')
          // qbdelorder.splice(index, 1)
          //                 that.setData({
          //         allOrder: qbdelorder
          //       })
          wx.request({
            url: app.globalData.httpsUrl +'/mp/getOrder.php',
            data: {
              'function': 'getOrderDel',
              id: id
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function(res) {
              if (res.data.code == 0) {
                qbdelorder.splice(index, 1)
                wx.showToast({
                  title: res.data.msg,
                  time: 1500
                })
                that.setData({
                  allOrder: qbdelorder
                })
              }
              if (res.data.code == 1) {
                wx.showToast({
                  title: res.data.msg,
                  time: 1500
                })
                return false
              }
            }
          })

        } else if (res4.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  gowuliu: function(e) {
    console.log(e)
    var olderNumber = e.currentTarget.dataset.dh
    var id = e.currentTarget.dataset.id
    var wlgs = e.currentTarget.dataset.wlgs
    wx.navigateTo({
      url: '../Logistics/Logistics?olderNumber=' + olderNumber + '&id=' + id + '&wlgs=' + wlgs
    })
  }
})
var app = getApp()
Page({
  data: {
    navbar: ['全部', '待支付', '待收货', '待评价', '已完成'],
    currentTab: 0,
    show: false,
    daizhifu: [],
    daishouhuo: [],
    daipingjia: [],
    yiwancheng: []
    // none: '',
    // block: ' ',
    // none1:'',
    // block1:''
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
        url: 'https://sale.heliangwang.com/mp/getOrder.php',
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
        url: 'https://sale.heliangwang.com/mp/getOrder.php',
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
        url: 'https://sale.heliangwang.com/mp/getOrder.php',
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
        url: 'https://sale.heliangwang.com/mp/getOrder.php',
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
      url: 'https://sale.heliangwang.com/mp/getOrder.php',
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
      url: 'https://sale.heliangwang.com/mp/getOrder.php',
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
            url: 'https://sale.heliangwang.com/mp/getOrder.php',
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
            url: 'https://sale.heliangwang.com/mp/getOrder.php',
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
            url: 'https://sale.heliangwang.com/mp/getOrder.php',
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

  }
})
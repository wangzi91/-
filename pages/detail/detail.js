Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [

    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    HomeIndex: 0,
    showModalStatus: false,
    cat: [],
    nav: null,
    currentTab: 0,
    goods: null,
    plid: '',
    count: '',
    pinglun: '',
    tupian: '',
    sku: '',
    value: 1,
    userid:''
  },
  boxtwo: function(e) {
    var index = parseInt(e.currentTarget.dataset.index)
    this.setData({
      HomeIndex: index
    })
    //评论
    if (this.data.HomeIndex == 1) {
      var that = this
      var id = this.data.plid
      wx.request({
        url: 'https://sale.heliangwang.com/mp/getCommodityDetail.php',
        data: {
          'function': 'getCommodityComment',
          id: id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          console.log(res)
          that.setData({
            count: res.data.count,
            pinglun: res.data.comment,

          })

        }
      })
    }
  },
  btn: function(e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    var chandi = e.currentTarget.dataset.item
    console.log(chandi)
    this.setData({
      nav: index,
      chandi: chandi
    })
  },
  //收藏
  gocollect: function() {
    var that = this
    console.log(this.data.cartitems)
    var collect = wx.getStorageSync("collect") || []
    var exist = collect.find(function(el) {
      return el.id == that.data.cartitems.id
    })
    if (exist) {
      wx.showToast({
        title: "已经收藏了！",
        duration: 1000
      })
    } else {
      collect.push({
        id: this.data.cartitems.id,
        title: this.data.cartitems.title1,
        image: this.data.cartitems.picture,
        price: this.data.cartitems.price,
        // value: this.data.cartitems.value,
        selected: true,
      })
      wx.showToast({
        title: "收藏成功！",
        duration: 1000
      })
    }
    wx.setStorageSync("collect", collect)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    this.setData({
      plid: id
    })
    var that = this
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getCommodityDetail.php',
      data: {
        'function': 'getCommodityDetail',
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data)
        that.setData({
          imgUrls: res.data.detailimg,
          cartitems: res.data
        })
      }
    })
    //评论
    var id = this.data.plid
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getCommodityDetail.php',
      data: {
        'function': 'getCommodityComment',
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        that.setData({
          count: res.data.count,
        })
      }
    })
  },
  gocart: function() {
    var that = this
    if (!this.data.chandi) {
      wx.showToast({
        title: '请选择产地！',
        duration: 1500,
        icon: 'loading'
      })
      return false
    }
    var pid = this.data.sku.id
    var pvalue = this.data.sku.value
    var pchandi = this.data.chandi
    var puid = this.data.userid
    console.log(pid, pvalue, pchandi, puid)

    wx.request({
      url: 'https://sale.heliangwang.com/mp/getShoppingCart.php',
      data: {
        'function': 'getAddCart',
        id: puid,
        gid: pid,
        number: pvalue,
        origin: pchandi
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            duration: 1500
          })
          // that.setData({
          //   bs: res.data.bs,
          // })
          // wx.setStorageSync('bs', that.data.bs)
        } else {
          wx.showToast({
            title: res.data.msg,
            duration: 1500
          })
          return false
        }
      }
    })
  },
  onShow: function() {
    var uid = wx.getStorageSync('userid')
    this.setData({
      userid: uid
    })
  },

  //显示对话框
  showModal: function() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)

    //sku
    var that = this
    var id = this.data.plid
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getCommodityDetail.php',
      data: {
        'function': 'getCommodityAttr',
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        that.setData({
          sku: res.data
        })
      }
    })
  },
  //隐藏对话框
  hideModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  add: function(e) {
    console.log(e)
    var sku = this.data.sku //获取购物车列表
    var cartItems = this.data.cartItems
    var value = this.data.sku.value
    value++
    console.log(value)
    sku.value = value
    this.setData({
      sku: sku
    })
  },

  //减
  reduce: function(e) {
    //获取购物车列表
    var sku = this.data.sku
    var value = this.data.sku.value //获取购物车里面的value值
    var cartItems = this.data.cartItems
    if (value == 1) {
      value--
      sku.value = 1
    } else {
      value--
      sku.value = value;
    }
    this.setData({
      sku: sku
    });

  },

  gobuy2: function(e) {
    var that = this
    if (this.data.userid == ''){
      wx.showToast({
        title: '请登录！',
        duration: 1500,
        icon: 'loading'
      })
      return false
    }
    if (!this.data.chandi) {
      wx.showToast({
        title: '请选择产地！',
        duration: 1500,
        icon: 'loading'
      })
      return false
    }
    var pid = this.data.sku.id
    var pvalue = this.data.sku.value
    var pchandi = this.data.chandi
    var puid = this.data.userid
    console.log(pid, pvalue, pchandi, puid)
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getOrderAdd.php',
      data: {
        'function': 'getOrderDetailCom',
        id: puid,
        gid: pid,
        number: pvalue,
        origin: pchandi
        // bs:1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            duration: 1500
          })
          that.setData({
            bs: res.data.bs,
          })
          wx.setStorageSync('bs', that.data.bs)
        }

        wx.navigateTo({
          url: '../conofirmorder/conofirmorder',
        })
      }
    })
  }
})
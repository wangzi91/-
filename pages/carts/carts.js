Page({
  data: {
    startX: 0, //开始坐标
    startY: 0,
    showcart: true,
    showtot: false,
    CheckAll: true,
    shanchushow: false,
    totalshow: true,
    jisuanshow: true,
    showedit: false,
    hideedit: true,
    total: ''
  },
  editdel: function() {
    this.setData({
      showedit: true,
      hideedit: false,
      jisuanshow: false,
      shanchushow: true,
      totalshow: false,
    })
  },
  showcart: function() {
    this.setData({
      showedit: false,
      hideedit: true,
      jisuanshow: true,
      shanchushow: false,
      totalshow: true,
    })
  },
  seldel: function(e) {
    var that = this;
    //获取购物车列表
    var cartItems = this.data.cartItems
    var arr = []
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].selected == false) {
        arr.push(cartItems[i])
      }
    }
    this.setData({
      cartItems: arr
    })
    // console.log(this.data.cartItems)

    if (this.data.cartItems.length == 0) {
      this.setData({
        showtot: false,
        showedit: false,
        cartList: true
      })
    }
    var arrsel2 = []
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].selected == true) {
        // arrsel2.push(cartItems[i].id)
        arrsel2.push({
          id: cartItems[i].id,
        })
      }
    }
    console.log(arrsel2)
    var jarr2 = JSON.stringify(arrsel2)
    var userid = this.data.uid2
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getSumCart.php',
      data: {
        'function': 'getDelCart',
        data: jarr2,
        uid: userid
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
            total: res.data.sellar
          })
        }
      }
    })

    wx.showToast({
      title: "删除成功！",
      duration: 1000,
    })


  },
  //选择
  select: function(e) {
    var that = this
    var total = this.data.total
    var CheckAll = this.data.CheckAll;
    CheckAll = !CheckAll
    var cartItems = this.data.cartItems

    for (var i = 0; i < cartItems.length; i++) {
      cartItems[i].selected = CheckAll
    }

    this.setData({
      cartItems: cartItems,
      CheckAll: CheckAll
    })
    if (CheckAll) {
      var arrsel2 = []
      for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].selected == true) {
          // arrsel2.push(cartItems[i].id)
          arrsel2.push({
            id: cartItems[i].id,
            value: cartItems[i].value,
            price: cartItems[i].price
          })
        }
      }
      console.log(arrsel2)
      var jarr2 = JSON.stringify(arrsel2)
      wx.request({
        url: 'https://sale.heliangwang.com/mp/getSumCart.php',
        data: {
          'function': 'getSumCart',
          data: jarr2
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
    } else {
      this.setData({
        total: 0.00
      })
    }


  },
  add: function(e) {
    var that = this;
    var cartItems = this.data.cartItems //获取购物车列表
    var index = e.currentTarget.dataset.index //获取当前点击事件的下标索引
    var value = cartItems[index].value //获取购物车里面的value值
    var id = e.currentTarget.dataset.id
    var value = e.currentTarget.dataset.value
    var price = e.currentTarget.dataset.price
    value++
    cartItems[index].value = value;



    this.setData({
      cartItems: cartItems
    });

    var arrsel2 = []
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].selected == true) {
        // arrsel2.push(cartItems[i].id)
        arrsel2.push({
          id: cartItems[i].id,
          value: cartItems[i].value,
          price: cartItems[i].price
        })
      }
    }
    console.log(arrsel2)
    var jarr2 = JSON.stringify(arrsel2)
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getSumCart.php',
      data: {
        'function': 'getSumCart',
        data: jarr2
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

  },

  //减
  reduce: function(e) {
    var that = this
    var cartItems = this.data.cartItems //获取购物车列表
    var index = e.currentTarget.dataset.index //获取当前点击事件的下标索引
    var value = cartItems[index].value //获取购物车里面的value值

    var id = e.currentTarget.dataset.id
    var value = e.currentTarget.dataset.value
    var price = e.currentTarget.dataset.price
    if (value == 1) {
      value--
      cartItems[index].value = 1
    } else {
      value--
      cartItems[index].value = value;
    }
    this.setData({
      cartItems: cartItems
    });
    var arrsel2 = []
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].selected == true) {
        arrsel2.push({
          id: cartItems[i].id,
          value: cartItems[i].value,
          price: cartItems[i].price
        })
      }
    }
    console.log(arrsel2)
    var jarr2 = JSON.stringify(arrsel2)
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getSumCart.php',
      data: {
        'function': 'getSumCart',
        data: jarr2
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
  },
  // 选择
  selectedCart: function(e) {
    var that = this
    let CheckAll = this.data.CheckAll;
    var cartItems = this.data.cartItems //获取购物车列表
    var index = e.currentTarget.dataset.index; //获取当前点击事件的下标索引
    var selected = cartItems[index].selected; //获取购物车里面的value值
    var value = cartItems[index].value //获取购物车里面的value值
    var id = e.currentTarget.dataset.id
    var value = e.currentTarget.dataset.value
    var price = e.currentTarget.dataset.price
    //取反
    cartItems[index].selected = !selected;
    //只要有一个没选定就取消全选
    const symbol = cartItems.some(cart => {
      return cart.selected === false;
    });
    if (symbol) {
      this.data.CheckAll = false;
    } else {
      this.data.CheckAll = true;
    }
    this.setData({
      cartItems: cartItems,
      CheckAll: this.data.CheckAll
    })

    var arrsel2 = []
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].selected == true) {
        // arrsel2.push(cartItems[i].id)
        arrsel2.push({
          id: cartItems[i].id,
          value: cartItems[i].value,
          price: cartItems[i].price
        })
      }
    }
    console.log(arrsel2)
    var jarr2 = JSON.stringify(arrsel2)
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getSumCart.php',
      data: {
        'function': 'getSumCart',
        data: jarr2
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

  },

  onLoad: function(e) {



    // if (!cartItems) {
    //   this.setData({
    //     showcart: true
    //   })
    // }
    // var that = this;
    // //common是自己写的公共JS方法，可忽略
    // // common.sys_main(app, that, e);
    // for (var i = 0; i < 10; i++) {
    //   this.data.cartItems.push({
    //     content: i + " 向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦",
    //     isTouchMove: false //默认隐藏删除
    //   })
    // }
    // this.setData({
    //   cartItems: this.data.cartItems
    // });
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    //开始触摸时 重置所有删除
    this.data.cartItems.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      cartItems: this.data.cartItems
    })
  },
  //滑动事件处理
  touchmove: function(e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.cartItems.forEach(function(v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      cartItems: that.data.cartItems
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //滑动删除事件
  del: function(e) {
    var that = this
    var cartItems = this.data.cartItems
    //获取购物车列表
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    cartItems.splice(index, 1)
    this.setData({
      cartItems: cartItems,
      cartlength: cartItems.length,
    });
    wx.showToast({
      title: "删除成功！",
      duration: 1000,

    })
    if (cartItems.length == 0) {
      console.log("购物车空")
      this.setData({
        cartList: true,
        showtot: false,
        hideedit: false,
        showedit: false
      })
    }
    var arrsel2 = [{
      id: id,
    }]

    console.log(arrsel2)
    var jarr2 = JSON.stringify(arrsel2)
    var userid = this.data.uid2
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getSumCart.php',
      data: {
        'function': 'getDelCart',
        data: jarr2,
        uid: userid
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
            total: res.data.sellar
          })
        }
      }
    })

    // if (cartItems.length) {
    //   this.setData({
    //     cartList: false,
    //   });
    // }

  },
  onShow: function() {
    // var cartItems = wx.getStorageSync("cartItems")
    this.setData({
      CheckAll: true
    })

    var that = this
    var uid = wx.getStorageSync('userid')
    this.setData({
      uid2: uid
    })
    var userid = this.data.uid2
    console.log(userid)
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getShoppingCart.php',
      data: {
        'function': 'getShowCart',
        id: userid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        that.setData({
          cartItems: res.data.show,
          total: res.data.sellar
        })
        var cartItems = that.data.cartItems
        if (cartItems.length >= 1) {
          that.setData({
            cartList: false,
            showtot: true,
            hideedit: true,
            shanchushow: false,
            jisuanshow: true,
            totalshow: true
          })
        }
        if (cartItems.length == 0) {
          console.log("购物车空")
          that.setData({
            cartList: true,
            showtot: false,
            hideedit: false,

          })
        }
      }
    })



  },

  // go: function(e) {
  //   this.setData({
  //     cartItems: []
  //   })
  //   // wx.setStorageSync("cartItems", [])
  // },


  //合计
  // getsumTotal: function() {
  //   var sum = 0
  //   for (var i = 0; i < this.data.cartItems.length; i++) {
  //     if (this.data.cartItems[i].selected) {
  //       sum += this.data.cartItems[i].value * this.data.cartItems[i].price
  //     }
  //   }
  //   //更新数据
  //   this.setData({
  //     total: sum
  //   })
  // },
  goorder: function() {
    var that = this;
    //获取购物车列表
    var cartItems = this.data.cartItems
    var arrsel = []
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].selected == true) {
        arrsel.push({
          id: cartItems[i].id
        })
      }
    }
    console.log(arrsel)
    var jarr2 = JSON.stringify(arrsel)
    var uid = wx.getStorageSync('userid')
    if (this.data.total == 0) {
      wx.showToast({
        title: "请选择商品",
        duration: 1000,
        icon: "loading"
      })
      return false
    }
    wx.request({
      url: 'https://sale.heliangwang.com/mp/getSumCart.php',
      data: {
        'function': 'getSetCart',
        id: jarr2,
        uid:uid
      
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
          duration: 1000,      
        })
        that.setData({
          bs: res.data.bs,
        })
        wx.setStorageSync('bs', that.data.bs)
        wx.navigateTo({
          url: '../conofirmorder/conofirmorder',
        })
      }
    })
    // this.setData({
    //   selarr: arrsel
    // })

    // console.log(this.data.selarr)
    // wx.setStorageSync('selarr', this.data.selarr)


  }

  // togopay: function() {
  //   wx.navigateTo({
  //     url: '../allpay/allpay',
  //   })
  //   var total = this.data.total
  //   console.log(total)
  //   wx.setStorageSync("total", total)
  // }

})
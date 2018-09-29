Page({
  data: {
    startX: 0, //开始坐标
    startY: 0,
    showcart: true,
    showtot: false,
    CheckAll: true,
    iconshow: false,
    showedit: false,
    hideedit: true
  },
  editdel: function() {
    this.setData({
      showtot: true,
      hideedit: false,
      showedit: true
    })
  },
  showcart: function() {
    this.setData({
      showtot: false,
      hideedit: true,
      showedit: false
    })
  },
  gocarts: function(e) {
    var that = this;
    //获取购物车列表
    var cartItems = this.data.cartItems
    var arrsel = []
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].selected == true) {
        arrsel.push(cartItems[i])
      }
    }
    this.setData({
      selarr: arrsel
    })
    // if (this.data.total == 0) {
    //   wx.showToast({
    //     title: "请选择商品",
    //     duration: 1000,
    //     icon: "loading"
    //   })
    //   return false
    // } 
    console.log(this.data.selarr)
    var gouwuche = wx.getStorageSync("cartItems")
    for (var i = 0; i < this.data.selarr.length; i++) {
      gouwuche.push({
        id: that.data.selarr[i].id,
        title: that.data.selarr[i].title,
        image: that.data.selarr[i].image,
        price: that.data.selarr[i].price,
        value: that.data.selarr[i].value,
        selected: true,
      })
    }
    wx.showToast({
      title: "添加成功！",
      duration: 1000
    })
    console.log(gouwuche)
    console.log(e)
    wx.setStorageSync("cartItems", gouwuche)
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
    if (this.data.cartItems.length == 0) {
      this.setData({
        showtot: false,
        showedit: false,
        cartList: true
      })
    }
    wx.showToast({
      title: "删除成功！",
      duration: 1000,
    })

    wx.setStorageSync("collect", this.data.cartItems)
  },
  //选择
  select: function(e) {
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

  },
  // 选择
  selectedCart: function(e) {
    let CheckAll = this.data.CheckAll;
    var cartItems = this.data.cartItems //获取购物车列表
    var index = e.currentTarget.dataset.index; //获取当前点击事件的下标索引
    var selected = cartItems[index].selected; //获取购物车里面的value值

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

    // wx.setStorageSync("cartItems", cartItems)
  },

  onLoad: function(e) {
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
  //删除事件
  del: function(e) {
    var cartItems = this.data.cartItems
    //获取购物车列表
    var index = e.currentTarget.dataset.index //获取当前点击事件的下标索引
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
    wx.setStorageSync("collect", cartItems)
  },
  onShow: function() {
    var cartItems = wx.getStorageSync("collect")
    var uid = wx.getStorageSync('userid')
    this.setData({
      cartItems: cartItems,
      uid: uid
    })
    var cartItems = this.data.cartItems
    if (cartItems.length >= 1) {
      this.setData({
        cartList: false,

        hideedit: true,
      })
    }
    if (cartItems.length == 0) {
      console.log("购物车空")
      this.setData({
        cartList: true,
        hideedit: false,
      })
    }
    this.setData({
      cartlength: cartItems.length,
    })
    console.log(cartItems.length)
  },
  godetail: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })

    wx.request({
      url: 'https://sale.heliangwang.com/mp/getMine.php',
      data: {
        'function': 'getMineFooterAdd',
        id: id,
        uid: this.data.uid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
      }
    })
  }
})
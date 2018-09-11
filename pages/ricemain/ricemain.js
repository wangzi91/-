var app = getApp()
Page({
  data: {
    navbar: ['大米', '小米', '红豆', '绿豆', '其他杂粮'],
    currentTab: 0
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  godetail: function () {
    wx.navigateTo({
      url: '../detail/detail',
    })
  }
})
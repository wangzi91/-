// pages/receivables/receivables.js
var listart, newlistart;
//获取应用实例
const app = getApp()
var p = 0, _nnn = 0;

var GetList = function (that) {
  wx.request({
    url: "https://api.mfcad.com/api/home/Receipt/index",
    data: {},
    method: 'GET', //必须为大写（例如：POST）
    header: {
      'content-type': 'application/json',
      'XX-Token': wx.getStorageSync('token'),
      'XX-Device-Type': 'wxapp',
    },
    success: function (res) {


      console.log("_______________" + _nnn);

      // console.log( that.data.pageSize);

      if (res.statusCode == 200) {
        if (_nnn >= res.data.length) {
          that.setData({
           // listart: listart,
            loading: "没有更多数据了..",
            loadingtips: false,
            isMoreData: true
          });
        } else {
          //console.log("_______............________" + res.data.length);
          //res.data.length
          var listart = that.data.list
          for (var i = 0; i < that.data.pageSize; i++) {
            _nnn = p * that.data.pageSize + i;            
            if (res.data[(p * that.data.pageSize)] == undefined){
              that.setData({
                listart: listart,
                loading: "没有更多数据了..",
                loadingtips: false,
                isMoreData: true
              });
              console.log("__________" + _nnn);
              return false;
            }
            listart.push(res.data[(p * that.data.pageSize) + i])
            console.log(res.data[(p * that.data.pageSize) + i]);
          }
          that.setData({
            listart: listart
          });
          p++;
        }
      }


    }
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageSize: 20,//需要返回数据的个数
    pageNo: p,// 第几次加载
    loading: "下滑加载更多",
    isBottom: false,
    isMoreData: false,
    loadingtips: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    // 跳转登录
    app.login();
    //app.logout();//退出登录
    //console.log(wx.getStorageSync('token'));
    if (wx.getStorageSync('token')) {
      GetList(that);
    }
  },
  // 页面上拉触底事件（上拉加载更多）
  onReachBottom: function () {
    //上拉
    console.log("上拉")
    var that = this
    GetList(that)
  },

  getData: function () {
    var that = this;
    // if (_id < totalnum && !that.data.isBottom) {
    if (!that.data.isBottom) {
      _id = pageindex * that.data.callbackcount;
      console.log(pageindex);

      console.log(33);
      that.setData({
        loading: "加载中...",
        loadingtips: true,  //触发到上拉事件，把isFromSearch设为为false  
        isBottom: true
      });
      setTimeout(function () {
        wx.request({
          url: 'https://api.mfcad.com/api/home/Receipt/index?limit=' + _id + ',' + that.data.callbackcount, //接口地址
          data: {},
          method: 'GET', //必须为大写（例如：POST）
          header: {
            'content-type': 'application/json',
            'XX-Token': wx.getStorageSync('token'),
            'XX-Device-Type': 'wxapp',
          },
          success: function (res) {
            if (res.statusCode == 200) {
              newlistart = res.data; //加载全部数据(一条)
              if (_id <= totalnum) {
                if (newlistart != undefined) {
                  listart = listart.concat(newlistart);
                  pageindex++;
                  console.log("_" + pageindex);
                } else {
                  listart = [];
                }
                if (_id >= totalnum - that.data.callbackcount) {
                  that.setData({
                    listart: listart,
                    loading: "没有更多数据了111..",
                    loadingtips: false,
                    isMoreData: true
                  });
                } else {
                  that.setData({
                    listart: listart,
                    loading: "下滑加载更多222",
                    loadingtips: false,
                    // isBottom: false
                  });
                }
              } else {
                that.setData({
                  listart: listart,
                  loading: "没有更多数据了..",
                  loadingtips: false,
                  isMoreData: true
                });
              }
            }
          }
        })
      }, 3000)
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
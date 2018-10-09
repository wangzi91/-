// pages/evaluate/evaluate.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formdata:'',
    img_arr:[],

  },

  upload: function () {
    var that = this
    for (var i = 0; i < this.data.img_arr.length; i++) {
      wx.uploadFile({
        url: '',
        filePath: that.data.img_arr[i],
        name: 'content',
        formData: adds,
        success: function (res) {
          console.log(res)
          if (res) {
            wx.showToast({
              title: '已提交评价！',
              duration: 1500
            });
          }
        }
      })
    }
    this.setData({
      formdata: ''
    })
  },  
  upimg:function(){
    var that = this;
    var length = this.data.img_arr.length +1
    if (this.data.img_arr.length < 5) {
      wx.chooseImage({
        count: 5 - length +1,
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths)
          })
        }
      })
    } else {
      wx.showToast({
        title: '最多上传五张图片',
        icon: 'loading',
        duration: 1500
      });
    }  

  },
  deleteImage: function (e) {
    var that = this;
    var images = that.data.img_arr;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          images.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          img_arr: images
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
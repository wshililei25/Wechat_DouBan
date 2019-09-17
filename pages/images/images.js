// pages/images/images.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

    photos: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.setNavigationBarTitle({
      title: '剧照',
    });
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000,
    });
    wx.request({
      url: 'http://api.douban.com/v2/movie/subject/' + options.movieId + '/photos?apikey=0df993c66c0c636e29ecbb5344252a4a',
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {
        console.log(res)
        that.setData({
          photos: res.data.photos
        })
        wx.hideToast()
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
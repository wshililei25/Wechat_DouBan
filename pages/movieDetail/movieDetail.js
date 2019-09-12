// pages/movieDetail/movieDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId: '',
    movieDetail: null,
    progress: 0,
    progress1: 0,
    progress2: 0,
    progress3: 0,
    progress4: 0,
    progress5: 0,
    tab_image: "block" //默认显示视频封面图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/' + options.movieId + '?apikey=0df993c66c0c636e29ecbb5344252a4a',
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {

        console.log(res)
        wx.setNavigationBarTitle({
          title: res.data.title,
        })

        that.setData({
          movieDetail: res.data,
          progress: res.data.rating.details["1"] + res.data.rating.details["2"] + res.data.rating.details["3"] + res.data.rating.details["4"] + res.data.rating.details["5"],
        })
        var progress1Result = Math.round(res.data.rating.details["1"] / that.data.progress * 100);
        var progress2Result = Math.round(res.data.rating.details["2"] / that.data.progress * 100);
        var progress3Result = Math.round(res.data.rating.details["3"] / that.data.progress * 100);
        var progress4Result = Math.round(res.data.rating.details["4"] / that.data.progress * 100);
        var progress5Result = Math.round(res.data.rating.details["5"] / that.data.progress * 100);

        that.setData({
          progress1: progress1Result,
          progress2: progress2Result,
          progress3: progress3Result,
          progress4: progress4Result,
          progress5: progress5Result,
        })
        wx.hideToast()
      }
    })
  },


  /**
   * 这里点击播放按钮事件，播放视屏【把封面图片隐藏】
   */
  bindplay: function(e) {
    this.setData({
      tab_image: "none"
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
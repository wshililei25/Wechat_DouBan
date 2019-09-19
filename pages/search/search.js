// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thisWeekList: null,
    topList: null,
    beiMeiList: null,
    newMovieList: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadThisWeekList();
    this.loadBeiMeiList();
    this.loadTopList();
    this.loadNewMovieList();
  },

  /**
   * 本周榜单
   */
  loadThisWeekList() {
    let that = this;
    wx.request({
      url: 'http://api.douban.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a',
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {
        console.log(res)
        that.setData({
          thisWeekList: res.data
        })
      }
    })
  },

  /**
   * 北美榜单
   */
  loadBeiMeiList() {
    let that = this;
    wx.request({
      url: 'http://api.douban.com/v2/movie/us_box?apikey=0df993c66c0c636e29ecbb5344252a4a',
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {
        console.log(res)
        that.setData({
          beiMeiList: res.data
        })
      }
    })
  },

  /**
   * Top250榜单
   */
  loadTopList() {
    let that = this;
    wx.request({
      url: 'http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=1&count=18',
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {
        console.log(res)
        that.setData({
          topList: res.data
        })
      }
    })
  },

  /**
   * 新片榜单
   */
  loadNewMovieList() {
    let that = this;
    wx.request({
      url: 'http://api.douban.com/v2/movie/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a',
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {
        console.log(res)
        that.setData({
          newMovieList: res.data
        })
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
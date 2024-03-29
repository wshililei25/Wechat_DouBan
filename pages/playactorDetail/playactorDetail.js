/**
 * 演员详情
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playactorId: '',
    photos: {}, //相册
    relevantFiguresPhotos: [], //相关人物
    playactorDetail: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadPlayactorDetail(options)
    console.log(options.playactorId)
  },

  /**
   * 演员详情
   */
  loadPlayactorDetail(options) {
    console.log(options);
    let that = this;
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000,
    });
    wx.request({
      url: 'http://api.douban.com/v2/movie/celebrity/' + options.playactorId + '?apikey=0df993c66c0c636e29ecbb5344252a4a',
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {
        console.log(res);
        wx.setNavigationBarTitle({
          title: res.data.name,
        });

        var peoples = [];
        for (var i in res.data.works) {
          for (var index in res.data.works[i].subject.casts) {
            if (options.playactorId != res.data.works[i].subject.casts[index].id) {
              peoples.push(res.data.works[i].subject.casts[index])
            }
          };
        };
        that.setData({
          playactorId: options.playactorId,
          playactorDetail: res.data,
          relevantFiguresPhotos: peoples
        });
        console.log(that.data.relevantFiguresPhotos);
        wx.hideToast()
      }
    })
  },

  /**
   * 电影详情
   */
  itemMovieTap(res) {
    console.log(res)
    var index = res.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/movieDetail/movieDetail?movieId=' + this.data.playactorDetail.works[index].subject.id,
    })
  },

  /**
   * 相关人物详情
   */
  itemTapPlayactor(res) {
    console.log(res)
    var index = res.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/playactorDetail/playactorDetail?playactorId=' + this.data.relevantFiguresPhotos[index].id,
    })
  },

  /**
   * 全部照片
   */
  allPhotoTap() {
    wx.navigateTo({
      url: '/pages/images/images?playactorId=' + this.data.playactorId,
    })
  },

  /**
   * 图片自适应宽高比
   */
  imageLoad: function(e) {
    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    // console.log("ratio=" + ratio);
    var viewWidth = 300 * ratio, //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 718 / ratio; //计算的高度值
    var image = this.data.photos;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      photos: image
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
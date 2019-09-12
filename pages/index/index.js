//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    douBanApikey: '0df993c66c0c636e29ecbb5344252a4a',
    imgUrls: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568039048924&di=950b691ea199cf32a90bde81f915140f&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fent%2Ftransform%2F184%2Fw630h354%2F20190212%2F_4Op-hswimzy4836776.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568039191818&di=caa508a97c47847044d6a3fe87af7058&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190823%2Faa2b2cee1cbf4b5e9ef967123eeec33d.jpeg',
      'http://www.3dmgame.com/uploads/allimg/150909/153_150909145806_2.jpg',
      'http://img1.cache.netease.com/catchpic/1/18/18D3B0BCE16EF386F6D7B7E37CBD254D.jpg',
      'http://img4.imgtn.bdimg.com/it/u=1475771496,1520974708&fm=26&gp=0.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    movies: null
  },

  onLoad: function () {
    this.loadMovie();
  },

  /**
   * 正在热映
   */
  loadMovie() {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    let that = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/nowplaying?apikey=' + this.data.douBanApikey,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {
        console.log(res)
        that.setData({
          movies: res.data.entries
        })
        wx.hideToast()
      }
    })
  },

  /**
   * 电影详情
   */
  itemClick(res) {
    console.log(res)
    var index = res.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/movieDetail/movieDetail?movieId=' + this.data.movies[index].id,
    })
  }
})
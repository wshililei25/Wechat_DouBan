//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

    currentTab: 0,
    tabStr: ['正在热映', '即将上映'],
    douBanApikey: '0df993c66c0c636e29ecbb5344252a4a',
    imgUrls: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568039048924&di=950b691ea199cf32a90bde81f915140f&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fent%2Ftransform%2F184%2Fw630h354%2F20190212%2F_4Op-hswimzy4836776.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568039191818&di=caa508a97c47847044d6a3fe87af7058&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190823%2Faa2b2cee1cbf4b5e9ef967123eeec33d.jpeg',
      'http://www.3dmgame.com/uploads/allimg/150909/153_150909145806_2.jpg',
      'http://img1.cache.netease.com/catchpic/1/18/18D3B0BCE16EF386F6D7B7E37CBD254D.jpg',
      'http://img4.imgtn.bdimg.com/it/u=1475771496,1520974708&fm=26&gp=0.jpg'
    ],
    imgUrlsFuture: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568699801376&di=5af9e7b938ce3db7b7786dc7b6c7f36e&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190903%2Fe19b0f8b291c4bc2a3d962537b92a5ba.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568700029762&di=3691089413fae98149c503541d860a98&imgtype=0&src=http%3A%2F%2Fimg.rednet.cn%2F2019%2F09-09%2F7cdbee07-1449-4255-8eb1-8a468faae65b.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    movies: null,
    moviesFuture: null,
    showLeft: true,
    showRight: false,
  },

  onLoad: function() {
    this.loadMovie();
    this.loadMovieFuture();
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
   * 即将上映
   */
  loadMovieFuture() {
    // wx.showToast({
    //   title: '正在加载',
    //   icon: 'loading',
    //   duration: 10000
    // })
    let that = this;
    wx.request({
      url: 'http://api.douban.com/v2/movie/coming?apikey=' + this.data.douBanApikey,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {
        console.log(res)
        that.setData({
          moviesFuture: res.data.entries
        })
        // wx.hideToast()
      }
    })
  },

  /**
   * 电影详情
   */
  itemClick(res) {
    console.log(res)
    var index = res.currentTarget.dataset.index;
    var id = '';
    if (this.data.showLeft) {
      id = this.data.movies[index].id;
    } else {
      id = this.data.moviesFuture[index].id;
    }
    wx.navigateTo({
      url: '/pages/movieDetail/movieDetail?movieId=' + id,
    })
  },

  tabTap(e) {
    console.log(e);
    var idx = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: idx,
    });

    if (this.data.currentTab == 0) {
      this.setData({
        showLeft: true,
        showRight: false
      })

    } else if (this.data.currentTab == 1) {
      this.setData({
        showLeft: false,
        showRight: true
      })
    };
    console.log('showRight=' + this.data.showRight);
  },

})
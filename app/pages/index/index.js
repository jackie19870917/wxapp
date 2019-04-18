//index.js
Page({
  data: {
    tables: [],
    modalHidden: true,
    modalText: ""
  },
  onLoad: function () {
    
  },
  viewDetail: function(e) {
    console.log(e)
     this.setData({
        modalHidden:false,
        modalText:"ok"
     })
  },
  close: function (e) {
    this.setData({
      modalHidden: true
    })
  },
  searchData: function (e) {
    var key = e.detail.value;
    var self = this;
    wx.request({
      url: 'http://jackie.iok.la/test/lyb', // 仅为示例，并非真实的接口地址
      data: {
        key: key
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        self.setData({
          tables: res.data.data
        })
      }
    })
  }
})

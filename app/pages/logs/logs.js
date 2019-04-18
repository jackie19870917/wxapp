//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    images: []
  },
  
  onLoad: function () {
    var self = this;
    wx.cloud.database().collection('images').get({
      success: function (res) {
        console.log(res.data)
        self.setData({
          images: res.data
        })
        wx.hideLoading()
      }
    })
  }
})

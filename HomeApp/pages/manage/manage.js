// pages/manage/manage.js
//logs.js
const util = require('../../utils/util.js')

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    imageDb: {},
    imageList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.imageDb = wx.cloud.database();
  },
  // 选择图片
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['camera', 'album'],
      sizeType: ['compressed', 'original'],
      count: 3,
      success: function (res) {
        console.log(res);
        // 预览图片
        var images = res.tempFilePaths;
        that.setData({
          imageList: images
        });
        // 上传到数据库
        for(var i in images){
          console.log(images[i]);
          wx.cloud.uploadFile({
            cloudPath: 'images/' + util.uuid() + util.filePix(images[i]),
            filePath: images[i], // 文件路径
          }).then(res => {
            // get resource ID
            console.log(res.fileID)
            that.imageDb.collection('images').add({
              // data 字段表示需新增的 JSON 数据
              data: {
                url: res.fileID,
                createTime: that.imageDb.serverDate(),
                descrebtion: "红尘闹处悄声过，洗却浮华返至真"
              }
            }).then(res => {console.log(res) }).catch(console.error);
          }).catch(error => {
            // handle error
            console.log(error)
          })
        }
        // toast提示上传成功
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 2000
        });
      }
    })
  }
})
// pages/list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lastItemIndex: 0,
    leftHeight: 0,
    rightHeight: 0,
    pageNo: 1,
    pageSize: 10,
    length: 10,
    descHeight: 30, //图片文字描述的高度
    pageStatus: false,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },

  // 加载数据
  loadData: function(){
    var _this = this;
    console.info("skip:" + _this.data.pageSize+" limit:"+(_this.data.pageNo - 1))
    wx.cloud.database().collection('images')
      .limit(_this.data.pageSize)
      .skip((_this.data.pageNo - 1) * _this.data.pageSize)
      .get()
      .then(res => {
        console.log(res.data)
        var datas = res.data;
        if (datas && datas.length > 0) {
          _this.setData({
            list: _this.data.list.concat(datas),
            length: datas.length
          })
        } else {
          _this.setData({
            pageStatus: false,
            pageNo: _this.data.pageNo - 1
          });
        }
      })
      .catch(err => {
        console.error(err)
      })
  },

  // 显示页面 
  onShow: function(){
    // this.setData({list:[]})
  },

  // 处理图片位置
  loadImage: function (e) {
    var vm = this;
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var index = e.currentTarget.dataset.index;
    vm.data.list[index].height = windowWidth / 2 / e.detail.width * e.detail.height;
    var count = 0;
    for (var i = (vm.data.pageNo - 1) * vm.data.pageSize; i < vm.data.list.length; i++) {
      if (vm.data.list[i].height) {
        count++;
      }
    }
    console.log("count:" + count + "  length:" + vm.data.length)
    if (count == vm.data.length) {
      for (var i = (vm.data.pageNo - 1) * vm.data.pageSize; i < vm.data.list.length; i++) {
        if (vm.data.leftHeight <= vm.data.rightHeight) {
          vm.data.list[i].top = vm.data.leftHeight;
          vm.data.list[i].left = windowWidth * 0.005;
          vm.setData({
            leftHeight: vm.data.leftHeight + vm.data.list[i].height + vm.data.descHeight
          });
        } else {
          vm.data.list[i].top = vm.data.rightHeight;
          vm.data.list[i].left = windowWidth / 2 - windowWidth * 0.005;
          vm.setData({
            rightHeight: vm.data.rightHeight + vm.data.list[i].height + vm.data.descHeight
          });
        }
      }
      vm.setData({
        list: vm.data.list
      });
    }
  },

  // 下拉加载更多
  onReachBottom: function () {
    var _this = this;
    _this.setData({
      pageStatus: true,
      pageNo: _this.data.pageNo + 1
    });
    // 数据库加载
    this.loadData()
  }
})
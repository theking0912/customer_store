const util = require('../../utils/util');
Page({
  data: {
    listData: [],
    countData: [],
    selectedFlag: [false, false, false, false],
  },
  onLoad: function() {
    var that = this;
    wx.request({
      url: 'https://m2ud4hhn.qcloud.la/store/select_all',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          listData: res.data.data
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    wx.request({
      url: 'https://m2ud4hhn.qcloud.la/store/select_g',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          countData: res.data
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onShow: function() {
    var that = this;
    wx.request({
      url: 'https://m2ud4hhn.qcloud.la/store/select_all',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          listData: res.data.data
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://m2ud4hhn.qcloud.la/store/select_all',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        // 设置数组元素
        that.setData({
          listData: res.data.data
        });
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  /**
   * 展开折叠选择
   */
  changeToggle: function(e) {
    var index = e.currentTarget.dataset.idx; // 获取当前下标
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }

    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },
  /**
   * 按钮事件
   */
  btnevent: function(e) {
    var index = e.currentTarget.dataset.btntype; // 获取当前下标
    var that = this;
    var listData = [];
    var that = this
    wx.request({
      url: 'https://m2ud4hhn.qcloud.la/store/select_s',
      data: {
        status: index
      },
      method: 'Get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (res.data == '') {
          util.showModel('获取考勤信息失败', '不存在该考勤');
        } else {
          //传输给服务器的搜索框文本
          that.setData({
            listData: res.data
          })
        }
      },
      fail: function(res) {
        util.showModel('获取考勤信息失败', '请检查网络连接是否正常');
      },
    })
  },
  /**
   * 搜索框根据店名查询
   */
  onBindconfirm: function(e) {
    var listData = [];
    var store_name_value = "";
    store_name_value = e.detail.value
    var that = this
    wx.request({
      url: 'https://m2ud4hhn.qcloud.la/store/select_n',
      data: {
        store_name: store_name_value
      },
      method: 'Get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (res.data == '') {
          util.showModel('获取考勤信息失败', '不存在该考勤');
        } else {
          //传输给服务器的搜索框文本
          that.setData({
            listData: res.data
          })
        }
      },
      fail: function(res) {
        util.showModel('获取考勤信息失败', '请检查网络连接是否正常');
      },
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function() {
  //   var that = this;
  //   // 显示加载图标
  //   // wx.showLoading({
  //   //   title: '加载中',
  //   // })
  //   wx.request({
  //     url: 'https://m2ud4hhn.qcloud.la/store/select_all',
  //     method: "GET",
  //     // 请求头部
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function(res) {
  //       // 设置数组元素
  //       that.setData({
  //         listData: res.data.data
  //       });
  //       // 隐藏导航栏加载框
  //       wx.hideNavigationBarLoading();
  //       // 停止下拉动作
  //       wx.stopPullDownRefresh();
  //     }
  //   })
  // }
})
const util = require('../../utils/util');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: null,
    username: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },
  getUsername: function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  getPassword: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  loginClick: function(e) {
    var that = this;
    app.globalData.userInfo = {
      username: this.data.username,
      password: this.data.password,
    }
    wx.request({
      url: 'https://m2ud4hhn.qcloud.la/store/cus_users_q',
      data: {
        customer_user_account: app.globalData.userInfo.username
      },
      method: 'Get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (app.globalData.userInfo.username == null) {
          util.showModel('获取用户信息错误', '请输入用户名');
        } else if (res.data.data == '') {
          util.showModel('获取用户信息错误', '用户名不存在');
        } else if (app.globalData.userInfo.password == null) {
          util.showModel('获取用户信息错误', '请输入密码');
        } else if (app.globalData.userInfo.password == '') {
          util.showModel('获取用户信息错误', '密码不可为空');
        } else {
          var username = res.data.data[0].customer_user_account;
          var password = res.data.data[0].customer_user_pass;
          if (app.globalData.userInfo.username == username && app.globalData.userInfo.password == password) {
            util.showSuccess('登录成功');
            wx.setStorageSync('wx_tb_customer_id', res.data.data[0].wx_tb_customer_id)
            wx.setStorageSync('wx_tb_store_id', res.data.data[0].wx_tb_store_id)
            wx.setStorageSync('user_region_province', res.data.data[0].user_region_province)
            wx.setStorageSync('user_region_city', res.data.data[0].user_region_city)
            wx.setStorageSync('user_region_district', res.data.data[0].user_region_district)
            wx.setStorageSync('user_store_type', res.data.data[0].user_store_type)
            wx.setStorageSync('customer_user_account', res.data.data[0].customer_user_account)
            wx.setStorageSync('customer_user_name', res.data.data[0].customer_user_name)
            wx.setStorageSync('customer_user_email', res.data.data[0].customer_user_email)
            wx.setStorageSync('customer_user_tel', res.data.data[0].customer_user_tel)
            wx.setStorageSync('wx_tb_log_head_id', res.data.data[0].wx_tb_log_head_id)
            if (res.data.data[0].customer_user_name == 'admin') {
              wx.redirectTo({
                url: "../customer_list/customer_list",
              })
            } else {
              wx.switchTab({
                url: "../customer_progress/customer_progress",
              })
            }
          } else {
            util.showModel('登录失败', '密码错误');
          }
        }
      },
      fail: function(res) {
        util.showModel('获取考勤信息失败', '请检查网络连接是否正常');
      },
    })
  }
})
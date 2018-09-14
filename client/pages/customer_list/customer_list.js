Page({
  data: {
    user_info: '',
    cusData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (wx.getStorageSync('customer_user_name')=='admin') {
      var customer_id = 'all'
    } else {
      var customer_id = wx.getStorageSync('wx_tb_customer_id')
    }
    console.log(customer_id)
    wx.request({
      url: 'https://m2ud4hhn.qcloud.la/store/cus_head_info_q',
      data: {
        wx_tb_customer_id: customer_id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          cusData: res.data.data
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
  /**
   * 获取门店信息
   */
  getSchoolMarkers() {
    let stores = [];
    for (let item of storeData) {
      stores.push(item)
    }
    return stores;
  }
})
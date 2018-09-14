const util = require('../../utils/util');
Page({
  data: {
    listData: [],
    countData: [],
    province_list: [],
    city_list: [],
    district_list: [],
    store_type_list: [],
    status_list: [],
    store_list: [],
    user_region_province: wx.getStorageSync('user_region_province'),
    user_store_type: wx.getStorageSync('user_store_type'),
    selectedFlag: [false, false, false, false]
  },
  onLoad: function() {
    var that = this;
    var query_par = [{
      wx_tb_customer_id: wx.getStorageSync('wx_tb_customer_id'),
      wx_tb_store_id: wx.getStorageSync('wx_tb_store_id'),
      user_region_province: wx.getStorageSync('user_region_province'),
      user_region_city: wx.getStorageSync('user_region_city'),
      user_region_district: wx.getStorageSync('user_region_district'),
      user_store_type: wx.getStorageSync('user_store_type'),
      status: 'all',
      store_name: 'all'
    }];
    console.log(query_par)
    that.getPageDetail(query_par);
    that.getTopFilter();
    wx.setStorageSync('province_index', "0")
    wx.setStorageSync('city_index', "0")
    wx.setStorageSync('district_index', "0")
    wx.setStorageSync('type_index', "0")
    wx.setStorageSync('status_index', "0")
    wx.setStorageSync('store_index', "0")
  },
  getPageDetail: function(query_par) {
    var data = {
      wx_tb_customer_id: query_par[0].wx_tb_customer_id,
      wx_tb_store_id: query_par[0].wx_tb_store_id,
      user_region_province: query_par[0].user_region_province,
      user_region_city: query_par[0].user_region_city,
      user_region_district: query_par[0].user_region_district,
      user_store_type: query_par[0].user_store_type,
      status: query_par[0].status,
      store_name: query_par[0].store_name
    }
    var that = this;
    wx.request({
      url: 'https://m2ud4hhn.qcloud.la/store/cus_store_progress_q',
      method: 'GET',
      data: data,
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
  getTopFilter: function() {
    var that = this;
    wx.request({
      url: 'https://m2ud4hhn.qcloud.la/store/cus_store_pcd_q',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {
        query_type: 'all',
        user_region_province: wx.getStorageSync('user_region_province'),
        user_region_city: wx.getStorageSync('user_region_city'),
        user_region_district: wx.getStorageSync('user_region_district'),
        user_store_type: wx.getStorageSync('user_store_type'),
        wx_tb_customer_id: wx.getStorageSync('wx_tb_customer_id')
      },
      success: function (res) {
        console.log(res.data.data)
        var obj_province_list = res.data.data.province_list
        var obj_city_list = res.data.data.city_list
        var obj_district_list = res.data.data.district_list
        var obj_store_type_list = res.data.data.store_type_list
        var obj_status_list = res.data.data.status_list
        var obj_store_list = res.data.data.store_list
        var province_list = []
        var city_list = []
        var district_list = []
        var store_type_list = []
        var status_list = []
        var store_list = []
        for (var i in obj_province_list) {
          if (i == 0) {
            if (obj_province_list.length != 1) {
              province_list.push('all');
              province_list.push(obj_province_list[i].province);
            } else {
              province_list.push(obj_province_list[i].province);
            }
          } else {
            province_list.push(obj_province_list[i].province);
          }
        }
        for (var i in obj_city_list) {
          if (i == 0) {
            if (obj_city_list.length != 1) {
              city_list.push('all');
              city_list.push(obj_city_list[i].city);
            } else {
              city_list.push(obj_city_list[i].city);
            }
          } else {
            city_list.push(obj_city_list[i].city);
          }
        }
        for (var i in obj_district_list) {
          if (i == 0) {
            if (obj_district_list.length != 1) {
              district_list.push('all');
              district_list.push(obj_district_list[i].district);
            } else {
              district_list.push(obj_district_list[i].district);
            }
          } else {
            district_list.push(obj_district_list[i].district);
          }
        }
        for (var i in obj_store_type_list) {
          if (i == 0) {
            if (obj_store_type_list.length != 1) {
              store_type_list.push('all');
              store_type_list.push(obj_store_type_list[i].store_type_desc);
            } else {
              store_type_list.push(obj_store_type_list[i].store_type_desc);
            }
          } else {
            store_type_list.push(obj_store_type_list[i].store_type_desc);
          }
        }
        for (var i in obj_status_list) {
          if (i == 0) {
            status_list.push('all')
            status_list.push(obj_status_list[i].status);
          } else {
            status_list.push(obj_status_list[i].status);
          }
        }
        for (var i in obj_store_list) {
          if (i == 0) {
            store_list.push('all');
            store_list.push(obj_store_list[i].store_name);
          } else {
            store_list.push(obj_store_list[i].store_name);
          }
        }
        that.setData({
          province_list: province_list,
          city_list: city_list,
          district_list: district_list,
          store_type_list: store_type_list,
          status_list: status_list,
          store_list: store_list
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
  bindPickerChange_province: function(e) {
    var that = this;
    this.setData({
      province_index: e.detail.value
    })
    var store_type = ''
    if (this.data.store_type_list[wx.getStorageSync('type_index')] == '直营') {
      store_type = 'ZY'
    } else if (this.data.store_type_list[wx.getStorageSync('type_index')] == '加盟') {
      store_type = 'JM'
    } else {
      store_type = 'all'
    }
    wx.setStorageSync('province_index', e.detail.value)
    var query_par = [{
      wx_tb_customer_id: wx.getStorageSync('wx_tb_customer_id'),
      wx_tb_store_id: wx.getStorageSync('wx_tb_store_id'),
      user_region_province: this.data.province_list[e.detail.value],
      user_region_city: this.data.city_list[wx.getStorageSync('city_index')],
      user_region_district: this.data.district_list[wx.getStorageSync('district_index')],
      user_store_type: 'all',
      status: this.data.store_list[wx.getStorageSync('status_index')],
      store_name: this.data.district_list[wx.getStorageSync('store_index')]
    }];
    that.getPageDetail(query_par);
  },
  bindPickerChange_city: function(e) {
    var that = this;
    this.setData({
      city_index: e.detail.value
    })
    var store_type = ''
    if (this.data.store_type_list[wx.getStorageSync('type_index')] == '直营') {
      store_type = 'ZY'
    } else if (this.data.store_type_list[wx.getStorageSync('type_index')] == '加盟') {
      store_type = 'JM'
    } else {
      store_type = 'all'
    }
    wx.setStorageSync('city_index', e.detail.value)
    var query_par = [{
      wx_tb_customer_id: wx.getStorageSync('wx_tb_customer_id'),
      wx_tb_store_id: wx.getStorageSync('wx_tb_store_id'),
      user_region_province: this.data.province_list[wx.getStorageSync('province_index')],
      user_region_city: this.data.city_list[e.detail.value],
      user_region_district: this.data.district_list[wx.getStorageSync('district_index')],
      user_store_type: 'all',
      status: this.data.status_list[wx.getStorageSync('status_index')],
      store_name: this.data.district_list[wx.getStorageSync('store_index')]
    }];
    that.getPageDetail(query_par);
  },
  bindPickerChange_district: function(e) {
    var that = this;
    this.setData({
      district_index: e.detail.value
    })
    var store_type = ''
    if (this.data.store_type_list[wx.getStorageSync('type_index')] == '直营') {
      store_type = 'ZY'
    } else if (this.data.store_type_list[wx.getStorageSync('type_index')] == '加盟') {
      store_type = 'JM'
    } else {
      store_type = 'all'
    }
    wx.setStorageSync('district_index', e.detail.value)
    var query_par = [{
      wx_tb_customer_id: wx.getStorageSync('wx_tb_customer_id'),
      wx_tb_store_id: wx.getStorageSync('wx_tb_store_id'),
      user_region_province: this.data.province_list[wx.getStorageSync('province_index')],
      user_region_city: this.data.city_list[wx.getStorageSync('city_index')],
      user_region_district: this.data.district_list[e.detail.value],
      user_store_type: 'all',
      status: this.data.store_list[wx.getStorageSync('status_index')],
      store_name: this.data.district_list[wx.getStorageSync('store_index')]
    }];
    that.getPageDetail(query_par);
  },
  bindPickerChange_type: function(e) {
    var that = this;
    this.setData({
      type_index: e.detail.value
    })
    var store_type = ''
    if (this.data.store_type_list[e.detail.value] == '直营') {
      store_type = 'ZY'
    } else if (this.data.store_type_list[e.detail.value] == '加盟') {
      store_type = 'JM'
    } else {
      store_type = 'all'
    }
    wx.setStorageSync('type_index', e.detail.value)
    var query_par = [{
      wx_tb_customer_id: wx.getStorageSync('wx_tb_customer_id'),
      wx_tb_store_id: wx.getStorageSync('wx_tb_store_id'),
      user_region_province: this.data.province_list[wx.getStorageSync('province_index')],
      user_region_city: this.data.city_list[wx.getStorageSync('city_index')],
      user_region_district: this.data.district_list[wx.getStorageSync('district_index')],
      user_store_type: store_type,
      status: this.data.store_list[wx.getStorageSync('status_index')],
      store_name: this.data.district_list[wx.getStorageSync('store_index')]
    }];
    that.getPageDetail(query_par);
  },
  bindPickerChange_status: function(e) {
    var that = this;
    this.setData({
      status_index: e.detail.value
    })
    var store_type = ''
    if (this.data.store_type_list[wx.getStorageSync('type_index')] == '直营') {
      store_type = 'ZY'
    } else if (this.data.store_type_list[wx.getStorageSync('type_index')] == '加盟') {
      store_type = 'JM'
    } else {
      store_type = 'all'
    }
    wx.setStorageSync('status_index', e.detail.value)
    var query_par = [{
      wx_tb_customer_id: wx.getStorageSync('wx_tb_customer_id'),
      wx_tb_store_id: wx.getStorageSync('wx_tb_store_id'),
      user_region_province: this.data.province_list[wx.getStorageSync('province_index')],
      user_region_city: this.data.city_list[wx.getStorageSync('city_index')],
      user_region_district: this.data.district_list[wx.getStorageSync('district_index')],
      user_store_type: store_type,
      status: this.data.status_list[e.detail.value],
      store_name: this.data.district_list[wx.getStorageSync('store_index')]
    }];
    that.getPageDetail(query_par);
  },
  bindPickerChange_store: function(e) {
    var that = this;
    this.setData({
      store_index: e.detail.value
    })
    var store_type = ''
    if (this.data.store_type_list[wx.getStorageSync('type_index')] == '直营') {
      store_type = 'ZY'
    } else if (this.data.store_type_list[wx.getStorageSync('type_index')] == '加盟') {
      store_type = 'JM'
    } else {
      store_type = 'all'
    }
    wx.setStorageSync('store_index', e.detail.value)
    var query_par = [{
      wx_tb_customer_id: wx.getStorageSync('wx_tb_customer_id'),
      wx_tb_store_id: wx.getStorageSync('wx_tb_store_id'),
      user_region_province: this.data.province_list[wx.getStorageSync('province_index')],
      user_region_city: this.data.city_list[wx.getStorageSync('city_index')],
      user_region_district: this.data.district_list[wx.getStorageSync('district_index')],
      user_store_type: store_type,
      status: this.data.status_list[wx.getStorageSync('status_index')],
      store_name: this.data.store_list[e.detail.value]
    }];
    that.getPageDetail(query_par);
  },
  onShow: function() {
    this.onLoad()
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://m2ud4hhn.qcloud.la/store/cus_store_progress_q',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        wx_tb_customer_id: wx.getStorageSync('wx_tb_customer_id'),
        wx_tb_store_id: wx.getStorageSync('wx_tb_store_id'),
        user_region_province: wx.getStorageSync('user_region_province'),
        user_region_city: wx.getStorageSync('user_region_city'),
        user_region_district: wx.getStorageSync('user_region_district'),
        user_store_type: wx.getStorageSync('user_store_type'),
        status: 'all',
        store_name: 'all'
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
var app = getApp();
Page({
  data: {
    index: 0,
    start_time: '',
    plan_start_time: '',
    expected_transfer_time: '',
    notice_str: '',
    address_components: [],
    location: [],
    markers: [],
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    status: ["招商", "签约", "选址", "装修", "培训", "试营", "开业"],
    status_seq: {
      "招商": 14,
      "签约": 29,
      "选址": 43,
      "装修": 57,
      "培训": 71,
      "试营": 86,
      "开业": 100
    },
    region: ['省', '市', '区'],
    store_type: ['直营', '加盟'],
  },
  onLoad: function(options) {},
  getAddressLL: function(p_address) {
    let that = this;
    var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
    var demo = new QQMapWX({
      key: 'KGTBZ-FQ6LV-5EWPR-UG6CQ-JJUUF-DOFV5' // 必填
    });
    //地址解析(地址转坐标)     
    demo.geocoder({
      address: p_address,
      success: function(res) {
        wx.setStorageSync('address_components', res.result.address_components)
        wx.setStorageSync('location', res.result.location)
        let markers = [];
        let marker = {
          iconPath: "../../../images/location.png",
          id: 0,
          name: p_address,
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          width: 14,
          height: 30
        };
        markers.push(marker)
        that.setData({
          address_components: res.result.address_components,
          location: res.result.location,
          markers: markers
        })
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      }
    })
  },
  modalcnt: function(list_data) {
    var that = this;
    wx.showModal({
      title: '提交确认',
      content: '提交前请验证地图标点是否正确？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://m2ud4hhn.qcloud.la/store/cus_store_insert',
            data: list_data,
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            success: function(res) {
              console.log(res.data)
              that.switchTab_url('../customer_progress/customer_progress');
            },
            fail: function(res) {
              that.modalTap();
            }
          })
        } else if (res.cancel) {
          console.log('00000')
        }
      }
    })
  },
  // radio单选按钮
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  //  点击日期组件确定事件  
  bindDateChange1: function(e) {
    this.setData({
      start_time: e.detail.value
    })
  },
  bindDateChange2: function(e) {
    this.setData({
      plan_start_time: e.detail.value
    })
  },
  bindDateChange3: function(e) {
    this.setData({
      expected_transfer_time: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  toast1Change: function(e) {
    this.setData({
      toast1Hidden: true
    });
  },
  //弹出确认框
  modalTap: function(e) {
    this.setData({
      modalHidden: false
    })
  },
  confirm_one: function(e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '提交成功'
    });
  },
  cancel_one: function(e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '取消成功'
    });
  },
  //弹出提示框
  modalTap2: function(e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function(e) {
    this.setData({
      modalHidden2: true
    })
  },
  bindPickerChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  // 验证地址
  checkAddress: function(e) {
    var that = this;
    var address = e.detail.value.pcd[0] + e.detail.value.pcd[1] + e.detail.value.pcd[2] + e.detail.value.address_detail
    that.getAddressLL(address);
  },
  // 提交数据入库
  formSubmit: function(e) {
    console.log(e.detail.value)
    var that = this;
    var formData = e.detail.value;
    if (e.detail.value.store_name.length == 0) {
      var msg = '门店名称';
      this.showerrmsg(msg);
    } else if (e.detail.value.person_charge.length == 0) {
      var msg = '负责人';
      this.showerrmsg(msg);
    } else if (e.detail.value.design_area.length == 0) {
      var msg = '设计面积';
      this.showerrmsg(msg);
    } else if (e.detail.value.start_time == null) {
      var msg = '开工时间';
      this.showerrmsg(msg);
    } else if (e.detail.value.plan_start_time == null) {
      var msg = '计划开工时间';
      this.showerrmsg(msg);
    } else if (e.detail.value.expected_transfer_time == null) {
      var msg = '期望开工时间';
      this.showerrmsg(msg);
    } else if (e.detail.value.pcd[0] + e.detail.value.pcd[1] + e.detail.value.pcd[2] == '省市区') {
      var msg = '省市区';
      this.showerrmsg(msg);
    } else if (e.detail.value.address_detail == "") {
      var msg = '详细地址';
      this.showerrmsg(msg);
    } else {
      var address = e.detail.value.pcd[0] + e.detail.value.pcd[1] + e.detail.value.pcd[2] + e.detail.value.address_detail
      // ---------------------
      let that = this;
      var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
      var demo = new QQMapWX({
        key: 'KGTBZ-FQ6LV-5EWPR-UG6CQ-JJUUF-DOFV5' // 必填
      });
      //地址解析(地址转坐标)     
      demo.geocoder({
        address: address,
        success: function(res) {
          wx.setStorageSync('address_components', res.result.address_components)
          wx.setStorageSync('location', res.result.location)
          let markers = [];
          let marker = {
            iconPath: "../../../images/location.png",
            id: 0,
            name: address,
            latitude: res.result.location.lat,
            longitude: res.result.location.lng,
            width: 14,
            height: 26
          };
          if (e.detail.value.store_type == '直营') {
            var s_type = 'ZY'
          } else {
            var s_type = 'JM'
          }
          var mydate = new Date();
          var date = (mydate.getFullYear()) + "" +
            (mydate.getMonth() + 1) + "" +
            (mydate.getDate()) + "" +
            (mydate.getHours()) + "" +
            (mydate.getMinutes()) + "" +
            (mydate.getSeconds());
          var list_data = {
            wx_tb_customer_id: wx.getStorageSync('wx_tb_customer_id'),
            store_name: e.detail.value.store_name,
            store_type: s_type,
            store_type_desc: e.detail.value.store_type,
            wx_tb_store_id: wx.getStorageSync('wx_tb_store_id'),
            address: address,
            province: res.result.address_components.province,
            city: res.result.address_components.city,
            district: res.result.address_components.district,
            street: res.result.address_components.street,
            street_number: res.result.address_components.street_number,
            lat: res.result.location.lat,
            lng: res.result.location.lng,
            person_charge: e.detail.value.person_charge,
            design_area: e.detail.value.design_area,
            status_seq: that.data.status_seq[e.detail.value.status],
            status: e.detail.value.status,
            start_time: e.detail.value.start_time,
            plan_start_time: e.detail.value.plan_start_time,
            expected_transfer_time: e.detail.value.expected_transfer_time,
            create_time: date,
            wx_tb_log_head_id: 1
          }
          console.log(list_data)
          // ----------提交数据到接口-----------
          that.modalcnt(list_data);
        },
        fail: function(res) {
          console.log(res);
        },
        complete: function(res) {
          console.log(res);
        }
      })
    }
  },
  switchTab_url: function(url) {
    wx.switchTab({
      url: url
    })
  },
  navigate_url: function(url) {
    wx.navigateTo({
      url: url
    })
  },
  redirect_url: function(url) {
    wx.redirectTo({
      url: url
    })
  },
  formReset: function() {
    console.log('form发生了reset事件');
    this.modalTap2();
  },
  // 消息弹窗
  showerrmsg: function(msg) {
    wx.showToast({
      title: msg + '信息不可为空！',
      icon: 'none',
      duration: 2000
    })
  }
})
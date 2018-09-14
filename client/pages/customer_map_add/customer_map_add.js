Page({
  data: {
    address_components:[],
    location: []
  },
  onLoad: function(options) {
    let that = this;
    var QQMapWX = require('../../../libs/qqmap-wx-jssdk.js');
    var demo = new QQMapWX({
      key: 'KGTBZ-FQ6LV-5EWPR-UG6CQ-JJUUF-DOFV5' // 必填
    });
    //关键词输入提示
    // demo.getSuggestion({
    //   keyword: '电影院',
    //   success: function(res) {
    //     console.log(res);
    //   },
    //   fail: function(res) {
    //     console.log(res);
    //   },
    //   complete: function(res) {
    //     console.log(res);
    //   }
    // });
    //逆地址解析(坐标位置描述)
    // demo.reverseGeocoder({
    //   location: {
    //     latitude: 39.984060,
    //     longitude: 116.307520
    //   },
    //   success: function(res) {
    //     console.log(res);
    //   },
    //   fail: function(res) {
    //     console.log(res);
    //   },
    //   complete: function(res) {
    //     console.log(res);
    //   }
    // });
    //地址解析(地址转坐标)     
    demo.geocoder({
      address: '乌兰察布市集宁旧区（红山区）红楼店',
      success: function(res) {
        console.log(res.result.address_components)
        that.setData({
          address_components: res.result.address_components,
          location: res.result.location
        })
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      }
    });
    //距离计算
    // demo.calculateDistance({
    //   to: [{
    //     latitude: 39.984060,
    //     longitude: 116.307520
    //   }, {
    //     latitude: 39.984572,
    //     longitude: 116.306339
    //   }],
    //   success: function(res) {
    //     console.log(res);
    //   },
    //   fail: function(res) {
    //     console.log(res);
    //   },
    //   complete: function(res) {
    //     console.log(res);
    //   }
    // });
    //获取城市列表
    // demo.getCityList({
    //   success: function(res) {
    //     console.log(res);
    //   },
    //   fail: function(res) {
    //     console.log(res);
    //   },
    //   complete: function(res) {
    //     console.log(res);
    //   }
    // });
    //获取城市区县
    // demo.getDistrictByCityId({
    //   id: '110000', // 对应城市ID
    //   success: function(res) {
    //     console.log(res);
    //   },
    //   fail: function(res) {
    //     console.log(res);
    //   },
    //   complete: function(res) {
    //     console.log(res);
    //   }
    // })
  }
})
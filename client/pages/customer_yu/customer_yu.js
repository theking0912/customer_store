const http = require('../../resources/markers.js')
Page({
  data: {
    markers: [],
    circles: []
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
    let that = this;
    that.getMarkers();
    that.getCircles();
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e)
  },
  controltap(e) {
    console.log(e.controlId)
    this.moveToLocation()
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  getMarkers: function (e) {
    var that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'https://m2ud4hhn.qcloud.la/store/customer_map',
        method: 'Get',
        data: {
          marker_type: "marker_yu"
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data == '') {
            util.showModel('获取考勤信息失败', '不存在该考勤');
          } else {
            var storeData = res.data.data
            let markers = [];
            let centerX = 113.3245211;
            let centerY = 23.10229;
            for (let item of storeData) {
              let marker = {
                iconPath: "../../../images/location.png",
                id: item.tb_address_test_id || 0,
                name: item.storename || '',
                latitude: item.latitude_TC,
                longitude: item.longitude_TC,
                width: 14,
                height: 30
              };
              markers.push(marker)
            }
            that.setData({
              centerX: 113.3245211,
              centerY: 23.10229,
              markers: markers
            })
          }
        },
        fail: function (res) {
          util.showModel('获取标注失败', '请检查网络连接是否正常');
        },
      })
    })
  },
  getCircles: function (e) {
    var that = this
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'https://m2ud4hhn.qcloud.la/store/customer_map',
        method: 'Get',
        data: {
          marker_type: "marker_wh"
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data == '') {
            util.showModel('获取考勤信息失败', '不存在该考勤');
          } else {
            var storeData = res.data.data
            let circles = [];
            for (let item of storeData) {
              let circle = {
                latitude: item.latitude_TC,
                longitude: item.longitude_TC,
                radius: 300000,
                color: "#EA0000AA",
                fillColor: "#FFFFFF0F",
                strokeWidth: 1
              };
              circles.push(circle)
            }
            for (let item of storeData) {
              let circle = {
                latitude: item.latitude_TC,
                longitude: item.longitude_TC,
                radius: 100000,
                color: "#2828FFAA",
                fillColor: "#FFFFFF0F",
                strokeWidth: 1
              };
              circles.push(circle)
            }
            for (let item of storeData) {
              let circle = {
                latitude: item.latitude_TC,
                longitude: item.longitude_TC,
                radius: 50000,
                color: "#00BB00AA",
                fillColor: "#FFFFFF0F",
                strokeWidth: 1
              };
              circles.push(circle)
            }
            that.setData({
              circles: circles
            })
          }
        },
        fail: function (res) {
          util.showModel('获取标注失败', '请检查网络连接是否正常');
        },
      })
    })
  }
})
let app = getApp();
var util = require('../../utils/util.js'); 
Page({
  data: {
    listData: [],
    store_weight: 0,
    head_order_number: '',
    head_order_line: '',
    code_value: '',
    order: '',
    line: ''
  },
  onLoad: function() {
    var that = this;
    wx.request({
      url: 'https://m2ud4hhn.qcloud.la/store/code_select',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var store_weight = 0;
        var head_order_number = '';
        var head_order_line = '';
        head_order_number = res.data.data[0].order_number;
        head_order_line = res.data.data[0].order_line;
        wx.setStorage({
          key: "order_local",
          data: head_order_number
        });
        wx.setStorage({
          key: "line_local",
          data: head_order_line
        });
        for (var i = 0; i < res.data.data.length; i++) {
          store_weight += Number(res.data.data[i].weight)
        }
        console.log(res)
        that.setData({
          listData: res.data.data,
          store_weight: store_weight,
          head_order_number: head_order_number,
          head_order_line: head_order_line
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
  scan: function(e) {
    var order_no = e.currentTarget.dataset.btntype
    var order_li = e.currentTarget.dataset.btntype
    wx.scanCode({
      success: (res) => {
        this.setData({
          code_value: res.result
        });
        this.save_code(res.result);
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },

  save_code(result) {
    var that = this;
    var code = new Object();
    var now_time = new Date();
    var year = now_time.getFullYear();
    var month = now_time.getMonth();
    var date = now_time.getDate();
    var hour = now_time.getHours();
    var min = now_time.getMinutes();
    var second = now_time.getSeconds();
    var order_time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + second;
    var code = {
      'order_number': '123123123000',
      'order_line': '123123123000',
      'initial_code': result,
      'weight': parseInt(that.getStrPart(result, 20, 6)),
      'production_time': '20' + that.getStrPart(result, 28, 2) + '-' + that.getStrPart(result, 30, 2) + '-' + that.getStrPart(result, 32, 2),
      'order_time': order_time
    };
    wx.request({
      url: 'https://m2ud4hhn.qcloud.la/store/code_insert',
      data: code,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function(res) {
        console.log(code)
        console.log('----success----')
        that.onLoad()
      },
      fail: function(res) {
        console.log('----fail----')
      }
    })
  },
  getStrPart(code, start, length) {
    var end = start + length;
    var strpart = code.substring(start, end);
    return strpart;
  },
})
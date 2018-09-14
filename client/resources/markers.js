module.exports = {
  getMarkers() {
    return new Promise(function(resolve, reject) {
      wx.request({
        url: 'https://m2ud4hhn.qcloud.la/store/map_jiu',
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          resolve(res.data.data)
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });
    })
  }
}
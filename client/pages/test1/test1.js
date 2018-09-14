Page({
  data: { // 定义data
    tempInfo: [{ // 模拟后台数据
      id: 1,
      subNum: 'C1609050001',
      percentage: 30,
      grade: 'SPCC',
      spec: '2.5*1200*C',
      weight: 500
    }, {
      id: 2,
      subNum: 'A1609050001',
      percentage: 80,
      grade: 'SPCC',
      spec: '3.5*1200*C',
      weight: 100
    }],
    dataInfo: [] // 重组数组内容
  },
  // 展开详情
  expandDetail: function (e) {
    var idx = e.currentTarget.dataset.idx, // 获取当前下标
      key = "dataInfo[" + idx + "].flag",
      val = this.data.dataInfo[idx].flag;
    this.setData({
      [key]: !val
    });
  },
  onLoad: function (opt) {
    for (var i in this.data.tempInfo) {
      this.data.tempInfo[i].flag = false; // 添加新属性
    };
    this.setData({
      dataInfo: this.data.tempInfo
    });
  }
})
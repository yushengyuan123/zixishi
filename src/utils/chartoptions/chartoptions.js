// const test = {
//   "message": "success",
//   "code": "1",
//   "data": {
//     "times": {
//       "周日": 23,
//       "周一": 0,
//       "周二": 21,
//       "周三": 0,
//       "周四": 0,
//       "周五": 0,
//       "周六": 0
//     }
//   }
// }

export const options = function(refreshData) {
  const options = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        name: '小时/h',
        type: 'value'
      }
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        barWidth: '60%',
        data: []
      }
    ]
  };
  options.xAxis[0].data = Object.keys(refreshData)
  options.series[0].data = Object.values(refreshData)
  return options
};

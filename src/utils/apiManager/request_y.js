let Authorization = ''

let base_url = 'http://47.102.125.28:8090/api/bookstore/'

export class _request {
  post(url, data) {
    return new Promise(resolve => {
      wx.request({
        url: base_url + url,
        method: 'POST',
        data: JSON.stringify(data),
        header: {
          Authorization: Authorization,
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data)
        }
      })
    })
  }

  get() {
    return new Promise(resolve => {
      wx.request({
        url: 'test.php',
        method: 'GET',
        header: {
          Authorization: Authorization,
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data)
        }
      })
    })
  }
}

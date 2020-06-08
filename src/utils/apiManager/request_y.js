import {baseUrl} from '../shared/request';

export class _request {
  request(header, config) {
    return new Promise((resolve, reject) => {
      let baseConfig = {
        success: (res) => {
          resolve(res.data)
        },
        reject: (res) => {
          console.log('拒绝')
        }
      }
      baseConfig = Object.assign(baseConfig, config)
      wx.request(baseConfig)
    })
  }
}

export class differentMethods extends _request{
  async post(url, data) {
    const header = {
      'content-type': 'application/json',
      'cookie': 'JSESSIONID=ADB3032445E8EDC34CEEFFB4F4F90724'
    }
    const config = {
      url: baseUrl + url,
      method: 'POST',
      data: JSON.stringify(data),
      header: header
    }
    return await this.request(header, config)
  }

  async get(url) {
    const header = {
      'cookie': 'JSESSIONID=ADB3032445E8EDC34CEEFFB4F4F90724'
    }
    const config = {
      url: baseUrl + url,
      method: 'GET',
      header: header
    }
    return await this.request(header, config)
  }

}

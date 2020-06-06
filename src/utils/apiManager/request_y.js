import {baseUrl} from '../shared/request';

let Authorization = ''


export class _request {
  request(methods, header, config) {
    let baseConfig = {
      url: baseUrl + url,
      success (res) {
        console.log(res.data)
      }
    }
    baseConfig = Object.assign(baseConfig, config)
    return new Promise(resolve => {
      wx.request(config)
    })
  }
}

class differentMethods extends _request{
  constructor() {
    super()
  }
  post() {

  }

}

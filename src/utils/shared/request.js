import wepy from 'wepy'

export const baseUrl = 'https://qgflower.qgailab.com:9998/api/bookstore';

/**wx.request服务封装 */
export class RequestService {

  static noLogin = true;
  static signature = "";

  /**
   * create by wq
   * info 错误信息
   * callBack 回调函数
   * errTip 自定义错误信息
   */
  static httpHandlerError(info, callBack, errTip) {
    let that = this;
    wepy.hideLoading()
    /**请求成功，退出该函数 */
    if ((info.statusCode >= 200 && info.statusCode <= 207) || info.statusCode === 304) {
      return false
    } else {
      /**401 没有权限时，重新登录 */
      if (info.code === 401) {
        wx.setStorageSync("noLogin", true);
        that.noLogin = true;
        wx.switchTab({
          url: 'pages/my'
        })
      }
      /**判断是否有自定义错误信息，如果有，优先使用自定义错误信息，其次曝出后台返回错误信息 */
      let errorInfo = ''
      if (errTip) {
        errorInfo = errTip
      } else {
        console.log(info)
        if (info.data.message) {
          errorInfo = info.data.message
        } else {
          errorInfo = '服务器忙!'
        }
      }
      wepy.showToast({
        title: errorInfo,
        icon: 'loading',
        duration: 3000
      })
      /**发生错误信息时，如果有回调函数，则执行回调 */
      if (callBack) {
        callBack()
      }
      return true
    }
  }
  /**
   * create by wq
   *请求封装
   *method 请求方式
   *reqData 发送请求数据
   *reqUrl 请求路径
   *failFn 请求失败，执行该函数
   *sucFn 请求成功，执行该函数
   */
  static soeRequest(method, reqData, reqUrl, failFn, sucFn) {
    wx.showLoading({
      title: "请稍等...",
      mask: true
    })
    if (this.noLogin) {
      wx.showModal({
        title: '提示',
        content: '你还没有登录噢！',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../pages/my'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

    wepy.request({
      /**header 如果需要验证token 可封装另外的getHeaders函数获取本地缓存token */
      // header: this.getHeaders(),
      header:
        reqUrl == "/user/login" ?
          {
            'content-type': 'application/json'
          }
          :
          {
            'content-type': 'application/json',
            'cookie': wx.getStorageSync("Authorization")
          },
      data: reqData,
      url: baseUrl + reqUrl,
      method: method,
      complete: (res) => {
        wx.hideLoading();
        let error = this.httpHandlerError(res, failFn)
        if (error) return;
        if (res.data.code === 0 || res.data.code === "0") {
          wx.setStorageSync("noLogin", true);
          that.noLogin = true;
          wx.switchTab({
            url: 'pages/my'
          })
        }else if(res.data.code === 1 || res.data.code === "1"){
          if (reqUrl == "/user/login") {
            sucFn(res);
          } else {
            sucFn(res.data);
          }
        }else {
          wepy.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
  };

  static wxLogin() {
    wx.showLoading({
      title: "登陆中...",
      mask: true
    })
    let that = this;
    wx.login({
      success: function (res) {
        console.log(res)
        let code = res.code;
        // 查看是否授权
        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: function (res) {
                  console.log(res, "授权信息")
                  console.log(wepy.$instance, "这是wepy")
                  wx.setStorageSync("noLogin", false);
                  that.noLogin = false;
                  let data = {
                    code: code,
                    icon: res.userInfo.avatarUrl,
                    nickName: res.userInfo.nickName
                  }
                  that.soeRequest('POST', data, '/user/login',
                    (fail) => {
                      console.log(fail);
                      console.log('失败');
                    },
                    (res) => {
                      console.log(res);
                      wx.hideLoading();
                      wx.setStorageSync('signature', res.data.data.signature);
                      let Authorization = res.cookies[0].split(";")[0];
                      console.log(Authorization)
                      // 写入token
                      wx.setStorageSync('Authorization', Authorization);
                      wx.setStorageSync('location', Authorization);
                      wx.setStorageSync('head', res.data.data.icon);
                    })
                }
              })
            } else {
              wx.hideLoading();
              wx.setStorageSync("noLogin", true);
              that.noLogin = true;
              wx.showModal({
                title: '提示',
                content: '你还没有登录噢！',
                success: function (res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '../pages/my'
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          }
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }

  static firstLogin(icon, nickName) {
    let that = this;
    wx.login({
      success: function (res) {
        console.log(res)
        let code = res.code;
        let data = {
          code: code,
          icon: icon,
          nickName: nickName
        }
        wx.setStorageSync("noLogin", false);
        that.noLogin = false;
        that.soeRequest('POST', data, '/user/login',
          (fail) => {
            console.log(fail);
            console.log('失败');
          },
          (res) => {
            wx.hideLoading();
            console.log(res);
            wx.showToast({
              title: '登陆成功啦~',
              icon: "success",   
              duration: 2000, 
            })
            let Authorization = res.cookies[0].split(";")[0];
            console.log(Authorization)
            // 写入token
            wx.setStorageSync('Authorization', Authorization);
            console.log(res.data.data.signature)
            wx.setStorageSync('signature', res.data.data.signature);
            wx.setStorageSync('head', icon);
          })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
}

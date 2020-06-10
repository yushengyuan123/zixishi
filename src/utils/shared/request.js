import wepy from 'wepy'

export const baseUrl = 'http://qgailab.com:9998/api/bookstore';

/**wx.request服务封装 */
export class RequestService {

  static noLogin = true;
  static signature = "";

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
    if (!wx.getStorageSync("Authorization")) {
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

    return new Promise(
      (resolve, reject) => {
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
          success: (res)=> {
            resolve(res)
            if (reqUrl == "/user/login") {
              sucFn(res);
            } else {
              sucFn(res.data);
            }
          },
          error: (res)=> {
            reject(res)
          }
        })
      }
    )
    
  };

  static wxLogin() {
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
                      // that.signature = res.data.data.signature;
                      // wepy.$instance.globalData.signature = res.data.data.signature;
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

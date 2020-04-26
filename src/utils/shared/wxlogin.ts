function WxLogin() {
  // @ts-ignore
  // wx.login({
  //   success (res) {
  //     if (res.code) {
  //       console.log(res.code)
  //     } else {
  //       console.log('登录失败！' + res.errMsg)
  //     }
  //   }
  // })
}

class User {
  constructor() {

  }

  getUser() {

    wx.authorize({
      scope: 'scope.record',
      success() {
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        wx.getUserInfo({
          success: function(res) {
            console.log(res)
          }
        })
      }
    });


  }
}

export let user = new User();

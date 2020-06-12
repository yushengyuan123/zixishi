export function successNotice(message, cb) {
  wx.showToast({
    title: message,
    success(){
      if (cb) {
        try {
          cb()
        } catch (e) {
          console.log('弹窗回调函数错误')
        }
      }
    }
  })
}

export function failNotice(message) {
  wx.showToast({
    title: message,
    icon: 'none',
  })
}


class Wx_alert {
  success(message) {
    wx.showToast({
      title: message
    })
  }

  fail(message) {
    wx.showToast({
      title: message,
      icon: 'none'
    })
  }
}

const alert = new Wx_alert()

export default alert

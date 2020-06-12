import alert from '../wx_alert/wx_alert';
function errorNotice(code) {
  if (code == -1) {
    alert.fail('请登陆后操作')
    wx.clearStorage()
    return false
  }
}

export function Response(res) {
  console.log(res)
  errorNotice(res.code)
  return res
}





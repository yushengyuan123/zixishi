import alert from '../wx_alert/wx_alert';
function errorNotice(code) {
  if (code == 401) {
    console.log('请登陆后操作')
    wx.clearStorage()
    return false
  } else if (code == -1) {
    console.log('错误代码-1')
    return false
  }
}

export function Response(res) {
  errorNotice(res.code)
  return res
}





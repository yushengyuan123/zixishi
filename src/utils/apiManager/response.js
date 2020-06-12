import { failNotice } from '../wx_alert/wx_alert';
function errorNotice(res) {
  if (res.code == 0 || res.code == 401) {
    wx.setStorageSync("noLogin", true);
    wx.switchTab({
      url: 'pages/my'
    })
  } else if (res.code == -1) {
    failNotice(res.message)
    return false
  }
}

export function Response(res) {
  errorNotice(res)
  return res
}





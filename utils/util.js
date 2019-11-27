
var Validator = {
  checkPhoneNum:function (phoneNumber) {
    if(phoneNumber.length != 11) return false
    let str = /^1\d{10}$/
    if (str.test(phoneNumber)) {
      return true
    } else {
      qq.showToast({
        title: '手机号不正确',
      })
      return false
    }
  }
} 


module.exports = {
  Validator : Validator,
}

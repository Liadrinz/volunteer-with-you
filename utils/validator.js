var checkPhoneNum = function(phoneNumber) {
    if(phoneNumber.length != 11) return false
    var str = new RegExp('^1\\d{10}$')
    if (str.test(phoneNumber)) 
      return true
    return false
}
var text = function(value,min){
  if(min!=-1)
    if(value.length < min) return false
  return true
}


module.exports = {
    text:text,
    phone:checkPhoneNum,

}
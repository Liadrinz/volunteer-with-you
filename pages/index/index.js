const app = getApp();

Page({
  data: {
    router: 'vol',
    volClr: 'red',
    meClr: 'grey',
    workClr: 'grey',
    userType: ''
  },
  onReady() {
    let userType = app.globalData.userInfo.userType;
    this.setData({
      userType: userType
    });
    if (userType === 'vol') this.toVol()
    else this.toWork()
  },
  toVol() {
    this.setData({
      router: "vol",
      volClr: 'red',
      meClr: 'grey',
      workClr: 'grey'
    })
  },
  toWork() {
    this.setData({
      router: "work",
      volClr: 'grey',
      meClr: 'grey',
      workClr: 'red'
    })
  },
  toMe() {
    this.setData({
      router: "me",
      volClr: 'grey',
      meClr: 'red',
      workClr: 'grey'
    })
  }
})
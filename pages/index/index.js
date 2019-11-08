const app = getApp();

Page({
  data: {
    router: 'vol',
    volClr: 'red',
    meClr: 'grey',
  },
  toVol() {
    this.setData({
      router: "vol",
      volClr: 'red',
      meClr: 'grey'
    })
  },
  toMe() {
    this.setData({
      router: "me",
      volClr: 'grey',
      meClr: 'red'
    })
  }
})
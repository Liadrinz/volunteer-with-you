const app = getApp();

Page({
  data: {
    router: 'vol',
    volClr: 'red',
    meClr: 'grey',
    workClr: 'grey',
    userType: app.globalData.userInfo.userType,
    actList: (() => {
      // let f = app.globalData.getSplit;
      let list = app.db.getActivities(10)
      // for (let i = 0; i < list.length; ++i) {
      //   if (f(list[i]['beginRegTime'], " ")[0] === f(list[i]['endRegTime'], " ")[0])
      //     list[i]['endRegTime'] = f(list[i]['endRegTime'], " ")[1];
      //   if (f(list[i]['beginTime'], " ")[0] === f(list[i]['endTime'], " ")[0])
      //     list[i]['endTime'] = f(list[i]['endTime'], " ")[1];
      // }
      return list;
    })()
  },
  onLoad() {
    if (this.data.userType === 'vol') this.toVol()
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
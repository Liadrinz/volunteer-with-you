const app = getApp();
var endIndex = 1;

Page({
  data: {
    router: 'vol',
    volClr: 'red',
    meClr: 'grey',
    workClr: 'grey',
    userType: app.globalData.userInfo.userType,
    isReady: false,
    actList: [],
    onGetAct: null,
  },
  onLoad() {
    if (this.data.userType === 'vol') this.toVol()
    else this.toWork()
    app.globalData.indexPageModel = this
    this.onLoaded()
  },
  onLoaded() {
    this.getNextActs(10)
  },
  onReachBottom(prop) {
    this.getNextActs(10)
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
  },

  //database
  getNextActs(n) {
    var that = this
    let act = this.selectComponent("#acts");
    act.setData({
      loading: true
    })
    return app.db.getActivities(endIndex, n).then((list, hasmore) => {
      if (hasmore)
        act.setData({
          loading: false,
        })
      else
        act.setData({
          isrunout: true,
        })
      this.data.actList.push(...list)
      that.setData({
        actList: this.data.actList,
      })
      endIndex = this.data.actList.length + 1
    }).catch(() => {
      act.setData({
        isrunout: true,
      })
    })
  }
  
})
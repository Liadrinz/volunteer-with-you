//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = qq.getStorageSync('logs') || []
    logs.unshift(Date.now())
    qq.setStorageSync('logs', logs)

    // 登录
    qq.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    qq.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          qq.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    qq.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
		if (capsule) {
		 	this.globalData.Custom = capsule;
			this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
		} else {
			this.globalData.CustomBar = e.statusBarHeight + 50;
		}
      }
    })
  },
  globalData: {
    userInfo: {
      userType: 'stf'  // vol = 志愿者, stf = 工作人员
    }
  },
  _privateData: {
    curActivityID:0,
  },
  //自定义函数

  // 返回下n个活动
  GetActivities:function(n){
    return this.activityList.slice(this._privateData.curActivityID,this._privateData.curActivityID+n-1)
    this._privateData.curActivityID = this._privateData.curActivityID+n
  },
  // 通过id 返回 对应的活动
  GetActivity:function(id){
    return this.activityList[id]
  },
  GetActivityPosts:function(activity){
    var posts = []
    for(let i in activity.posts){posts.push(this.postList[i])}
    return posts;
  },

  activityList:[
            {id:0, title: '教小朋友学Python', publishTime: '2019-10-01', beginRegTime: '2019-10-01', endRegTime: '2019-10-07', beginTime: '2020-01-15', endTime: '2020-03-01', location: '北邮幼儿园',detail:"2019年10月28日下午3:00至4:00",posts:[0,1],picture:'/images/u=3615214809,3485655572&fm=11&gp=0.jpg'},
            {id:1, title: '地铁志愿', publishTime: '2019-10-01', beginRegTime: '2019-10-01', endRegTime: '2019-10-01', beginTime: '2020-10-03', endTime: '2020-10-03', location: '地铁西土城站',detail:"	2019年11月9日上午9:00至2019年11月9日上午11:00",posts:null,picture:null,},
            {id:2, title: 'QCon', publishTime: '2019-10-01', beginRegTime: '2019-10-01', endRegTime: '2019-11-01', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心',detail:"2019年11月7日至2019年11月8日通过志愿服务服务于2020届毕业生双选会参会企业",posts:null,picture:null,},
  ],
  postList:[
    {id:0,name:"企业支持",descript:"协助企业进行参会服务",condition:"会python",plan:10,current:0},
    {id:1,name:"run",descript:"跑步",condition:"并不会python",plan:20,current:0},
  ]

})

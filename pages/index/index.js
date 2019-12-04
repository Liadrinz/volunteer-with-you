const app = getApp();
var page = 1;
var act;

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
    refresh() {
        this.onLoad();
    },
    onLoad() {
        qq.showShareMenu({
            showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
        })
        this.setData({
            userType:app.globalData.userInfo.userType,
        })
        if (this.data.userType === 'vol') this.toVol()
        else this.toWork()
        this.onLoaded()

    },
    onLoaded() {
        if (this.data.userType == "vol")
            act = this.selectComponent("#acts")
        else
            act = this.selectComponent("#work").data.activityComp;
        page = 1;
        this.setData({
            actList:[]
        })
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
        act.setData({
            loading: true
        })
        return app.db.getActivities(page, n).then((list, hasmore) => {
            console.log(list)
            if (hasmore)
                act.setData({
                    loading: false,
                })
            else
                act.setData({
                    isrunout: true,
                })
            this.data.actList.push(...list)
            this.setData({
                actList: this.data.actList,
            })
            page = page + 1
        }).catch(() => {
            act.setData({
                isrunout: true,
            })
        })
    }

})
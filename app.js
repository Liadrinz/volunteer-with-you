//app.js
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = qq.getStorageSync('logs') || []
        logs.unshift(Date.now())
        qq.setStorageSync('logs', logs)

        // 登录
        qq.login({
                success: res => {
                    this.globalData.userInfo.volunteerInfo = this.getUserVolunteerInfos()
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
                            this.globalData.userInfo.qqUserInfo = res.userInfo

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
            qqUserInfo:null,
            userType:'vol',
            volunteerInfo: null,
        },
        openId: null,
        
    },
    _privateData: {
        curActivityID: 0,
    },
    //自定义函数

    // 返回下n个活动
    GetActivities: function(n) {
        return this.activityList.slice(this._privateData.curActivityID, this._privateData.curActivityID + n - 1)
        this._privateData.curActivityID = this._privateData.curActivityID + n
    },
    // 通过id 返回 对应的活动
    GetActivity: function(id) {
        return this.activityList[id]
    },
    GetActivityPosts: function(activity) {
        var posts = []
        for (let i in activity.posts) { posts.push(this.postList[activity.posts[i]]) }
        return posts;
    },
    getUserVolunteerInfos: function(code) {
        //通过 qq.request 来使用 code请求用户信息
        //test
        return this.volunteerInfo;
    },
    getReawrdInfo:function(id){
        return this.postRewards[id]
    },
    //Post 相关
    getPost: function(id) {
        return this.postList[id]
    },
    setPost: function(post) {
        this.postList[post.id] = post
    },
    applyPost: function(post) {
        post = this.getPost(post.id)
        if (post.current < post.plan) {
            this.volunteerInfo.ongoingPosts.push(post.id)
            post.current++
                this.setPost(post)
            return true
        } else {
            return false
        }
    },
    canclePost: function(post) {
        post = this.getPost(post.id)
        let i = this.volunteerInfo.ongoingPosts.indexOf(post.id)
        for (let j = i + 1; j < this.volunteerInfo.ongoingPosts.length; j++) {
            this.volunteerInfo.ongoingPosts[j - 1] = this.volunteerInfo.ongoingPosts[j]
        }
        this.volunteerInfo.ongoingPosts.length--
            post.current--
            this.setPost(post)
    },

    //testing datas
    activityList: [
        { id: 0, title: '教小朋友学Python', beginRegTime: '2019-10-01', endRegTime: '2019-10-07', beginTime: '2020-01-15', endTime: '2020-03-01', location: '北邮幼儿园', detail: "2019年10月28日下午3:00至4:00", posts: [0, 1], picture: '/images/u=3615214809,3485655572&fm=11&gp=0.jpg',isDone:true},
        { id: 1, title: '地铁志愿', beginRegTime: '2019-10-01', endRegTime: '2019-10-01', beginTime: '2020-10-03', endTime: '2020-10-03', location: '地铁西土城站', detail: "	2019年11月9日上午9:00至2019年11月9日上午11:00", posts: [2], picture: null,isDone:true},
        { id: 2, title: 'QCon', beginRegTime: '2019-10-01', endRegTime: '2019-11-01', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心', detail: "2019年11月7日至2019年11月8日通过志愿服务服务于2020届毕业生双选会参会企业", posts: [3], picture: null,isDone:false },
        { id: 3, title: 'test1', beginRegTime: '2019-10-01', endRegTime: '2019-11-01', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心', detail: "2019年11月7日至2019年11月8日通过志愿服务服务于2020届毕业生双选会参会企业", posts: [4], picture: null,isDone:false },
    ],
    postList: [
        { id: 0, actID: 0, name: "企业支持", descript: "协助企业进行参会服务", condition: "会python", plan: 10, current: 10, },
        { id: 1, actID: 0, name: "run", descript: "跑步", condition: "并不会python", plan: 20, current: 0, },
        { id: 2, actID: 1, name: "站岗", descript: "站岗帮忙", condition: "有腿", plan: 10, current: 0, },
        { id: 3, actID: 2, name: "站岗", descript: "跑步", condition: "会机器学习", plan: 20, current: 0, },
        { id: 4, actID: 3, name: "test1", descript: "跑步", condition: "会机器学习", plan: 20, current: 0, },
    ],
    postRewards:[
        {id:0,uid:0,postid:0,type:"团体录入",state:"已生效",recordTime:"2019-7-20 19:20:10",rewardTime:10},
        {id:1,uid:0,postid:2,type:"团体录入",state:"已生效",recordTime:"2019-7-20 19:20:10",rewardTime:5},
    ]
    ,
    volunteerInfo: {
        id: 0,
        postRewards:[0,1],
        ongoingPosts: [3,4],
    }

})
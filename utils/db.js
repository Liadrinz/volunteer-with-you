var getData = {
    _privateData: {
        curActivityID: 0,
        curApplyID: 0
    },
    // 返回下n个活动
    getActivities: function(n) {
        return this.activityList.slice(this._privateData.curActivityID, this._privateData.curActivityID + n - 1)
        this._privateData.curActivityID = this._privateData.curActivityID + n
    },
    // 通过id 返回 对应的活动
    getActivity: function(id) {
        return this.activityList[id]
    },
    getActivityPosts: function(activity) {
        var posts = []
        for (let i in activity.posts) { posts.push(this.postList[activity.posts[i]]) }
        return posts;
    },
    getApply: function(id) {
        return this.applyList[id];
    },
    getApplies: function(n) {
        return this.applyList.slice(this._privateData.curApplyID, this._privateData.curApplyID + n - 1)
        this._privateData.curApplyID = this._privateData.curApplyID + n
    },
    getUserVolunteerInfos: function(code) {
        //通过 qq.request 来使用 code请求用户信息
        //test
        return this.volunteerInfo;
    },
    getReawrdInfo: function(id) {
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
    setVolInfo: function(volInfo) {
        for (let key in volInfo) {
            this.volunteerInfo[key] = volInfo[key]
        }
    },
    getTeamInfo: function() {
        return this.teamInfo;
    },
    getAllLocations: function () {
        return ['北邮幼儿园', '地铁西土城站', '北京国际会议中心'];
    },
    //testing datas
    activityList: [
        { id: 0, title: '教小朋友学Python', beginRegTime: '2019-10-01', endRegTime: '2019-10-07', beginTime: '2020-01-15', endTime: '2020-03-01', location: '北邮幼儿园', detail: "2019年10月28日下午3:00至4:00", posts: [0, 1], picture: '/images/u=3615214809,3485655572&fm=11&gp=0.jpg', isDone: true },
        { id: 1, title: '地铁志愿', beginRegTime: '2019-10-01', endRegTime: '2019-10-01', beginTime: '2020-10-03', endTime: '2020-10-03', location: '地铁西土城站', detail: "	2019年11月9日上午9:00至2019年11月9日上午11:00", posts: [2], picture: null, isDone: true },
        { id: 2, title: 'QCon', beginRegTime: '2019-10-01', endRegTime: '2019-11-01', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心', detail: "2019年11月7日至2019年11月8日通过志愿服务服务于2020届毕业生双选会参会企业", posts: [3], picture: null, isDone: false },
        { id: 3, title: 'test1', beginRegTime: '2019-10-01', endRegTime: '2019-11-01', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心', detail: "2019年11月7日至2019年11月8日通过志愿服务服务于2020届毕业生双选会参会企业", posts: [4], picture: null, isDone: false },
    ],
    postList: [
        { id: 0, actID: 0, name: "企业支持", descript: "协助企业进行参会服务", condition: "会python", plan: 10, current: 10, },
        { id: 1, actID: 0, name: "run", descript: "跑步", condition: "并不会python", plan: 20, current: 0, },
        { id: 2, actID: 1, name: "站岗", descript: "站岗帮忙", condition: "有腿", plan: 10, current: 0, },
        { id: 3, actID: 2, name: "站岗", descript: "跑步", condition: "会机器学习", plan: 20, current: 0, },
        { id: 4, actID: 3, name: "test1", descript: "跑步", condition: "会机器学习", plan: 20, current: 0, },
    ],
    applyList: [
        { id: 0, activity: { id: 0, title: "教小朋友学Python" }, applier: { name: "蔡宇昂", buptId: "2017211872", credit: 100, totalLength: 100 }, applyTime: "2019-10-01", comment: "您好，我想参加这个志愿活动" },
        { id: 1, activity: { id: 1, title: "地铁志愿" }, applier: { name: "陈凌云", buptId: "2017211868", credit: 100, totalLength: 100 }, applyTime: "2019-10-01", comment: "您好，我想参加这个志愿活动" },
        { id: 2, activity: { id: 1, title: "地铁志愿" }, applier: { name: "吴志镛", buptId: "2017211869", credit: 100, totalLength: 100 }, applyTime: "2019-10-01", comment: "您好，我想参加这个志愿活动" }
    ],
    postRewards: [
        { id: 0, uid: 0, postid: 0, type: "团体录入", state: "已生效", recordTime: "2019-7-20 19:20:10", rewardTime: 10 },
        { id: 1, uid: 0, postid: 2, type: "团体录入", state: "已生效", recordTime: "2019-7-20 19:20:10", rewardTime: 5 },
    ],
    volunteerInfo: {
        id: 0,
        name: "陈凌云",
        schoolid: 2017211868,
        grade: 2017211501,
        tel: null,
        qq: null,
        description: null,
        username: null,
        password: null,
        credit: 100, //信誉积分
        postRewards: [0, 1],
        ongoingPosts: [3, 4],
    },
    teamInfo: {
        name: "爱是志愿者协会",
        totalTime: 23333,
        activities: {
            doing: [1],
            done: [0, 2, 3]
        }
    }
}

export default getData;
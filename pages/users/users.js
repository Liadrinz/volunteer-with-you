const app = getApp()
Component({
    data: {
        userInfo: null,
        totalTime: 0,
    },
    options: {
        addGlobalClass: true,
    },
    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function() {
            this.updateData()
        },
    },
    methods: {

        updateData: function() {
            let userInfo = app.globalData.userInfo
            let volInfo = userInfo.volunteerInfo
            this.setData({
                userInfo: userInfo,
                totalTime: calTotalTime(volInfo.postRewards),
            })
        },
        getInfo2Show: function(type) {
            switch (type) {
                case 0:
                    return this._packRewardInfo(this.data.userInfo.volunteerInfo.postRewards)
                    break
                case 1:
                    return this._getActbyPosts(this.data.userInfo.volunteerInfo.ongoingPosts)
                    break
            }
        },
        _packRewardInfo: function(rewardids) {
            var rewards = []
            for (let i in rewardids) {
                let reward = app.getReawrdInfo(rewardids[i])
                reward.post = app.getPost(reward.postid)
                reward.activity = app.GetActivity(reward.post.actID)
                rewards.push(reward)
            }
            return rewards
        },
        _getActbyPosts: function(postIds) {
            var acts = []
            for (let i in postIds) {
                let post = app.getPost(postIds[i])
                acts.push(app.GetActivity(post.actID))
            }
            return acts
        },
    }
})

const calTotalTime = function(rewards) {
    let totalTime = 0
    for (let i in rewards) {
        let reward = app.getReawrdInfo(rewards[i])
        totalTime += reward.rewardTime
    }
    return totalTime
}
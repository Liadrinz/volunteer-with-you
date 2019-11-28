const app = getApp()
Component({
    data: {
        userInfo: null,
        totalTime: 0,
        modalName: null,
        timeCodes: null,
        _toggledTimeCodes: [],
        loggedIn: false,
        finishedPosts:[],
        ongoingPosts:[],
    },
    options: {
        addGlobalClass: true,
    },
    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function () {
            this.updateData()
        },
    },
    methods: {
        updateData: function () { 
            return app.db.getVolInfo().then(()=>{
                let userInfo = app.globalData.userInfo
                let projects = userInfo.volunteerInfo.projects
                console.log( userInfo.volunteerInfo.projects)
                this.data.finishedPosts = [];this.data.ongoingPosts=[]
                for(let i in projects){
                    if(projects[i].done==true){ 
                        this.data.finishedPosts.push(projects[i]);
                    }else{
                        this.data.ongoingPosts.push(projects[i])
                    }
                } 
                this.setData({
                    userInfo: userInfo,
                    timeCodes: userInfo.volunteerInfo.timeCodeList,
                    totalTime: this.getTotalTime(),
                    loggedIn: app.globalData.volToken != null,
                    finishedPosts:this.data.finishedPosts,
                    ongoingPosts:this.data.ongoingPosts,
                }) 
            })
            //calTotalTime(volInfo.postRewards),
        },
        // timeCode
        getTimeCodes: function () {
            var tiemCodes =this.data.userInfo.volunteerInfo.timeCodeList 
            //tiemCodes = this._packTiemCodes(tiemCodes)
            
            this.setData({
                timeCodes: tiemCodes
            })
        },
        toggleCode: function (e) {
            let indexes = e.detail.value;
            for (let i in indexes) {
                let index = indexes[i]
                if (this.data._toggledTimeCodes.indexOf(this.data.timeCodes[index]) == -1) {
                    this.data._toggledTimeCodes.push(this.data.timeCodes[index])
                }
            }
        },
        logCodes: function () {
            if (!this.data.loggedIn) {
                qq.showToast({
                    title: "请先登录",
                    image: "/images/icons/失败.png",
                    duration:500,
                })
                return
            }
            app.db.logExistCodes(this.data._toggledTimeCodes);
            this.updateData()
        },
        submitTimeCode: function (e) {
            var timecode = this.selectComponent("#codeInput").data.value
            app.db.logInputCodes(timecode).then(()=>{
                qq.showToast({
                    title: "录入成功",
                })
                this.hideModal()
            }).catch(()=>{
                qq.showToast({
                    title: "录入失败",
                    image: "/images/icons/失败.png",
                })
                this.updateData()
            })
        },
        submitVolInfo: function (volInfo) {
            return app.db.setVolInfo(volInfo)
        },
        getInfo2Show: function (type) {
            switch (type) {
                case 0:
                    return app.db.bjvolRewards;
                //return this._packRewardInfo1(app.db.bjvolProjects)
                case 1:
                    return this._packRewards(app.db.bjvolProjects)
                case 2:
                    return this.data.ongoingPosts
            }
        },

        loginBJVol(e) {
            let inputs = this.selectAllComponents("#loginInfo")
            for (let i in inputs) {
                if (!inputs[i].data.viable) {
                    qq.showToast({
                        title: "输入格式有误",
                        image: "/images/icons/失败.png"
                    })
                    return
                }
            }
            qq.setStorage({
                key: "loginInfo",
                data: e.detail.value
            })
            app.db.loginBJVol(e.detail.value).then((value) => {
                qq.showToast({
                    title: "登录成功",
                })
                this.hideModal()
            }).catch((value) => {
                qq.showToast({
                    title: "账号或密码错误",
                    image: "/images/icons/失败.png"
                })
            })

        },

        // 跳转逻辑
        toInfoSetting: function () {
            qq.navigateTo({
                url: "pages/infoSetting/infoSetting"
            })
        },

        // Modals
        showModal: function (e) {
            switch (e.currentTarget.dataset.modalname) {
                case "LoginModal":
                    qq.getStorage({
                        key: "loginInfo",
                        success: (data) => {
                            let inputs = this.selectAllComponents("#loginInfo")
                            for (let i in inputs) {
                                inputs[i].reset(data.data[inputs[i].data.name])
                            }
                        },
                        complete: () => {
                            this.setData({
                                modalName: e.currentTarget.dataset.modalname
                            })
                        }
                    })
                    return
                case "CodeLogModal":
                    if (!this.data.loggedIn) {
                        qq.showToast({
                            title: "请先登录",
                            image: "/images/icons/失败.png",
                        })
                        return
                    }
            }
            this.setData({
                modalName: e.currentTarget.dataset.modalname
            })

        },
        showTimeCode: function (e) {
            this.getTimeCodes();
            this.showModal(e)
        },
        hideModal: function () {
            this.setData({
                modalName: null
            })
            this.updateData()
        },





        // privates
        _packRewardInfo: function (rewardids) {
            var rewards = []
            for (let i in rewardids) {
                let reward = app.db.getReawrdInfo(rewardids[i])
                reward.post = app.db.getPost(reward.postid)
                reward.activity = app.db.getActivity(reward.post.actID)
                rewards.push(reward)
            }
            return rewards
        },
        _getActbyPosts: function (postIds) {
            var acts = []
            for (let i in postIds) {
                let post = app.db.getPost(postIds[i])
                acts.push(app.db.getActivity(post.actID))
            }
            return acts
        },
        _packRewards: function (pjs) {
            var rewards = []
            for (let i in pjs) {
                if (pjs[i].time != 0) {
                    rewards.push(pjs[i])
                }
            }
            return rewards
        }
        ,
        _packTiemCodes: function (tiemCodesRaw) {
            var postIds = [];
            for (let key in tiemCodesRaw) {
                postIds.push(tiemCodesRaw[key].postid)
            }
            var acts = this._getActbyPosts(postIds)
            for (let key in tiemCodesRaw) {
                tiemCodesRaw[key].activityTitle = acts[key].title
            }
            return tiemCodesRaw
        },

        // tests 分布之后删除
        getTotalTime() {
            let bjProjects = app.db.bjvolProjects
            this.data.totalTime = 0
            for (let i in bjProjects) {
                this.data.totalTime += parseFloat(bjProjects[i].time)
            }
            return this.data.totalTime
        }
    }
})

const calTotalTime = function (rewards) {
    let totalTime = 0
    for (let i in rewards) {
        let reward = app.db.getReawrdInfo(rewards[i])
        totalTime += reward.rewardTime
    }
    return totalTime
}
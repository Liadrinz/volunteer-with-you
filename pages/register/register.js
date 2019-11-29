const app = getApp();
var inputs = null;
Page({
    data: {
        userType: '',
        vol: {
            name: '',
            tel: '',
            grade: '',
            schoolid: '',
            qq: '',
            identity: '',
            description: ''
        },
        team: {
            teamname: '',
            tel: '',
            qq: '',
            schoolid: '',
            identity: '',
            teamdescription: ''
        },
        canSubmit: null,
    },
    onLoad(option) {
        this.setData({
            userType: app.globalData.userInfo.userType
        })
        inputs = this.selectAllComponents('#customInput')
        console.log(inputs)
        for (let i in inputs) {
            let name = inputs[i].data.name
            let attr = null
            if (this.data.userType == "vol")
                attr = this.data.vol[name]
            else
                attr = this.data.team[name]
            if (attr != null) {
                inputs[i].reset(attr)
            }
        }
    },
    handleAllChanges(e) {
        //let prop = e.currentTarget.dataset.prop;
        if (this.data.userType === 'vol') {
            let vol = this.data.vol;
            vol[prop] = e.detail.value;
        } else {
            let team = this.data.team;
            team[prop] = e.detail.value;
        }
    },
    register() {
        app.db.setVolInfo(this.data.vol).then(() => {
            for (let i in inputs) {
                let name = inputs[i].data.name
                let attr = null
                if (this.data.team)
                    attr = this.data.teamInfo[name]
                else
                    attr = this.data.volunteerInfo[name]
                if (attr != null) {
                    inputs[i].reset(attr)
                }
            }
            qq.showToast({
                title: "注册成功",
            })
            qq.navigateBack();
            qq.navigateTo({
                url: '/pages/index/index'
            })
        })
    },
    createTeam() {
        app.db.setTeamInfo(this.data.team).then(() => {
            qq.navigateBack();
            qq.navigateTo({
                url: '/pages/index/index'
            })
        })
    },
    volformSubmit: function (e) {
        console.log(e.detail.value)
        if (this.data.canSubmit) {
            app.db.setVolInfo(e.detail.value).then(() => {
                for (let i in inputs) {
                    inputs[i].reset(inputs[i].data.value)
                }
                qq.showToast({
                    title: "注册成功",
                })
                qq.navigateBack();
                qq.navigateTo({
                    url: '/pages/index/index'
                })
            }).catch((msg) => {
                qq.showToast({
                    title: "msg",
                    image: "/images/icons/失败.png"
                })
            })
        } else {
            qq.showToast({
                title: '格式不正确',
                image: "/images/icons/失败.png",
            })
        }
    },
    volformSubmit: function (e) {
        console.log(e.detail.value)
        if (this.data.canSubmit) {
            app.db.setVolInfo(e.detail.value).then(() => {
                for (let i in inputs) {
                    inputs[i].reset(inputs[i].data.value)
                }
                qq.showToast({
                    title: "注册成功",
                })
                qq.navigateBack();
                qq.navigateTo({
                    url: '/pages/index/index'
                })
            }).catch((msg) => {
                qq.showToast({
                    title: "msg",
                    image: "/images/icons/失败.png"
                })
            })
        } else {
            qq.showToast({
                title: '格式不正确',
                image: "/images/icons/失败.png",
            })
        }
    }, 
    teamformSubmit: function (e) {
        console.log(e.detail.value)
        if (this.data.canSubmit) {
            app.db.setTeamInfo(e.detail.value).then(() => {
                for (let i in inputs) {
                    inputs[i].reset(inputs[i].data.value)
                }
                qq.showToast({
                    title: '提交成功', 
                    icon: "success",
                })
            }).catch((msg) => {
                qq.showToast({
                    title: "msg",
                    image: "/images/icons/失败.png"
                })
            })
        } else {
            qq.showToast({
                title: '格式不正确',
                image: "/images/icons/失败.png",
            })
        }
    },
    validateCallBack: function (e) {
        this.setData({
            canSubmit: e.detail
        })
    },
});
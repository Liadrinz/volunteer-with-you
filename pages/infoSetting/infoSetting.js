var usersComp, teamComp;
var inputs;
Page({
    data: {
        volunteerInfo: null,
        teamInfo: null,
        canSubmit: false,
        team: false
    },
    onLoad: function (option) {
        if (option.team === '1') {
            this.setData({
                team: true
            });
        } 
        let pages = getCurrentPages()
        // 获取到 父页面的 user Component 组件
        if(this.data.team){
            teamComp = pages[pages.length - 2].selectComponent("#team")
            this.data.teamInfo = teamComp.data.userInfo.volunteerInfo
        }else{
            usersComp = pages[pages.length - 2].selectComponent("#users")
            this.data.volunteerInfo = usersComp.data.userInfo.volunteerInfo
        }
        inputs = this.selectAllComponents('#customInput')
        console.log(inputs)
        for (let i in inputs) {
            let name = inputs[i].data.name
            let attr = null
            if(this.data.team)
                attr = this.data.teamInfo[name]
            else
                attr = this.data.volunteerInfo[name]
            if (attr != null) {
                inputs[i].reset(attr)
            }
        }  
    },


    validateCallBack: function (e) {
        this.setData({
            canSubmit: e.detail
        })
    },
    volformSubmit: function (e) {
        if (this.data.canSubmit) {
            usersComp.submitVolInfo(e.detail.value).then(() => {

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
    teamformSubmit: function (e) {
        console.log(e.detail.value)
        if (this.data.canSubmit) {
            teamComp.submitTeamInfo(e.detail.value).then(() => {
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
    formReset: function (e) {
        for (let i in inputs) {
            inputs[i].reset()
        }
        qq.showToast({
            title: "重置成功",
        })
    }


})
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
        usersComp = pages[pages.length - 2].selectComponent("#users")
        teamComp = pages[pages.length - 2].selectComponent("#team")
        this.data.volunteerInfo = usersComp.data.userInfo.volunteerInfo
        this.data.teamInfo = teamComp.data.teamInfo
        inputs = this.selectAllComponents('#customInput')
        for (let i in inputs) {
            let name = inputs[i].data.name
            console.log(name)
            console.log(usersComp.data.userInfo)
            let attr = this.data.volunteerInfo[name]
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
    formSubmit: function (e) {
        if (this.data.canSubmit) {
            usersComp.submitVolInfo(e.detail.value).then(() => {

                for (let i in inputs) {
                    inputs[i].reset(inputs[i].data.value)
                } 
                qq.showToast({
                    title: '提交成功',
                    icon: "success",
                })
            }).catch((msg)=>{qq.showToast({
                title: "msg",
                image:"/images/icons/失败.png"
            })})
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
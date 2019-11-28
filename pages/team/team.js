const app = getApp();

Component({
    properties: {

    },
    data: {
        modalName: null,
        loggedIn: false,
        teamInfo: null
    },
    lifetimes: {
        attached() {
            let teamInfo = app.db.getTeamInfo();
            this.setData({
                teamInfo: teamInfo
            })
        }
    },
    methods: {
        getTeamInfo() {
            return this.data.teamInfo;
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
                case "CodeGenModal":
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
    }
})

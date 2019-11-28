const db = require("./utils/db.js").default;

//app.js
App({
    onLaunch: function () {
        this.db.qq = qq;
        this.db.app = this;
        // 获取系统的布局信息 设置系统样式
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
        //this.db.getVolInfo();
        // 登录 并获取一些信息
        qq.showLoading({
            title: "加载中"
        })
        new Promise((resolve, reject) => qq.login({
            success: res => {
                var that = this
                that.globalData.code = res.code
                console.log(res.code)
                this.db.getVolInfo(res.code).then((value) => {
                    that.globalData.userInfo.volunteerInfo = value
                }) 
                //resolve(resolve, reject)
            },
            complete: qq.hideLoading
        })).then((resolve, reject) => {
            this.db.userLogin().then((userType) => {
                switch (userType) {
                    case "vol":
                        break;
                    case "stf":
                        break;
                    case "none":
                        break;
                    case "both":
                        break;
                    default:
                        reject(); return;
                        break;
                }
                resolve()
            })
            // let newUser = 0;  // 新用户 
            // let multiUser = 0;  //多重身份的用户
            // if (newUser || multiUser) {
            //     qq.navigateTo({
            //         url: '/pages/welcome/welcome?registered=' + (1 - newUser)
            //     })
            // }
        })

        // 获取用户qq信息
        qq.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    qq.getUserInfo({
                        success: res => {
                            this.globalData.userInfo.qqUserInfo = res.userInfo

                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: {
            qqUserInfo: null,
            userType: 'stf',
            volunteerInfo: null,
        },
        openId: null,
        indexPageModel: null, 
        volToken: null,
        code: null,
    },
    db: db
})   
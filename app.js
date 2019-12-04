const db = require("./utils/db.js").default;

//app.js
var app = App({
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

        this.appLogin()
    },
    appLogin() {
        // 登录 并获取一些信息
        qq.showLoading({
            title: "加载中"
        })

        return new Promise((resolve, reject) => qq.login({
            success: res => {
                var that = this
                that.globalData.code = res.code
                this.db.userLogin().then((userType) => {
                    resolve(userType)
                })
            },
            complete: qq.hideLoading
        }))
    },
    globalData: {
        userInfo: {
            qqUserInfo: null,
            userType: 'vol',
            volunteerInfo: null,
        },
        openId: null,
        indexPageModel: null,
        volToken: null,
        code: null,
    },
    db: db
})      
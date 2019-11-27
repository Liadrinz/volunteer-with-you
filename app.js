const db = require("./utils/db.js").default;

//app.js
App({
    onLaunch: function () {
        this.db.qq = qq;
        this.db.app = this;
        //this.db.getVolInfo();
        // 登录 并获取一些信息
        qq.login({
            success: res => {
                var that = this
                that.globalData.code = res.code
                this.db.getVolInfo(res.code).then((value)=>{
                    that.globalData.userInfo.volunteerInfo = value
                })
            }
        })
        
        let newUser = 0;  // 新用户
        let multiUser = 0;  //多重身份的用户
        if (newUser || multiUser) {
            qq.navigateTo({
                url: '/pages/welcome/welcome?registered=' + (1 - newUser)
            })
        }

        // 获取用户信息
        qq.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    qq.getUserInfo({
                        success: res => {
                            //this.globalData.indexPageModel.onLoaded();
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
            qqUserInfo: null,
            userType: 'vol',
            volunteerInfo: null,
        },
        openId: null,
        indexPageModel: null,
        volToken:null,
        code :null,
    },
    db: db
}) 
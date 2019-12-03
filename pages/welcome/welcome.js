const app = getApp();

Page({
    data: {
        userType: null,

    },
    onLoad() {
        qq.showShareMenu({
            showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
        })

    },
    onShow(){
        app.appLogin().then((userType) => {
            this.setData({
                userType: userType
            })
        })
    },
    loginAsStf(e) {
        if (e.detail.errMsg == "getUserInfo:fail auth deny") {
            return
        }
        this.getUserInfo(e)
        app.db.getTeamInfo().then(() => {
            app.globalData.userInfo.userType = 'stf';
            qq.navigateTo({
                url: '/pages/index/index'
            })
        })
    },
    loginAsVol(e) {
        if (e.detail.errMsg == "getUserInfo:fail auth deny") {
            return
        }
        this.getUserInfo(e)
        app.db.getVolInfo().then(() => {
            app.globalData.userInfo.userType = 'vol';
            qq.navigateTo({
                url: '/pages/index/index'
            })
        })
    },
    registerAsStf(e) {
        if (this.data.userType == 'none') {
            qq.showToast({
                title: "请先注册志愿者",
                image: "/images/icons/失败.png"
            })
        } else {
            if (e.detail.errMsg == "getUserInfo:fail auth deny") {
                return
            }
            this.getUserInfo(e)
            app.globalData.userInfo.userType = 'stf';
            qq.navigateTo({
                url: '/pages/register/register'
            });
        }
    },
    registerAsVol(e) {
        if (e.detail.errMsg == "getUserInfo:fail auth deny") {
            return
        }
        this.getUserInfo(e)
        app.globalData.userInfo.userType = 'vol';
        qq.navigateTo({
            url: '/pages/register/register'
        });
    },
    getUserInfo(e) {
        app.globalData.userInfo.qqUserInfo = e.detail.userInfo;
    }
})
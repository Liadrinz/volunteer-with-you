const app = getApp();

Page({
    data: {
        userType: null,
    },
    onLoad() {
        app.appLogin().then((userType) => {
            this.setData({
                userType: userType
            })
        })
        // this.setData({
        //     userType : app.globalData.userInfo.userType
        // })
    },
    loginAsStf() {
        app.db.getTeamInfo().then(() => {
            app.globalData.userInfo.userType = 'stf';
            qq.navigateTo({
                url: '/pages/index/index'
            })
        })
    },
    loginAsVol() {
        app.db.getVolInfo().then(() => {
            app.globalData.userInfo.userType = 'vol';
            qq.navigateTo({
                url: '/pages/index/index'
            })
        })
    },
    registerAsStf() {
        if (app.globalData.userInfo.userType == 'none') {
            qq.showToast({
                title: "请先注册志愿者",
                image: "/images/icons/失败.png"
            })
        }
        app.globalData.userInfo.userType = 'stf';
        qq.navigateTo({
            url: '/pages/register/register'
        });
    },
    registerAsVol() {
        app.globalData.userInfo.userType = 'vol';
        qq.navigateTo({
            url: '/pages/register/register'
        });
    }
})
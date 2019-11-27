const app = getApp();

Page({
    data: {
        registered: true
    },
    onLoad(option) {
        this.setData({
            registered: option.registered
        })
    },
    loginAsStf() {
        app.globalData.userInfo.userType = 'stf';
        qq.navigateTo({
            url: '/pages/index/index'
        })
    },
    loginAsVol() {
        app.globalData.userInfo.userType = 'vol';
        qq.navigateTo({
            url: '/pages/index/index'
        })
    },
    registerAsStf() {
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
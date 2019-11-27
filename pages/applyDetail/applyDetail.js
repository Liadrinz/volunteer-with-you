const app = getApp();

Page({
    data: {
        apply: null
    },
    onLoad(option) {
        this.setData({
            apply: app.db.getApply(option.id)
        })   
    },
    admit() {
        qq.showToast({
            title: '已录用',
            success() {
                qq.navigateBack();
            }
        })
    },
    reject() {
        qq.showToast({
            title: '已拒绝',
            success() {
                qq.navigateBack();
            }
        })
    }
})

const app = getApp()

Page({
    data: {
        activity: null,
        posts: null,
        autoSize: {},
        actType: '',  // work/vol
    },
    onLoad: function (option) {
        var that = this
        app.db.getActivity(option.id).then((value) => {
            that.setData({
                activity: value,
                posts: this.updatePost(value),
                actType: option.actType
            })
        })
    },
    // 事件函数
    autoImage: function (e) {
        var imgScale = e.detail.width / e.detail.height
        var that = this
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    autoSize: { width: res.windowWidth, height: res.windowWidth / imgScale }
                })
            }
        })
    },
    updatePost: function (activity = this.data.activity) {
        // 由于post 可能随时更新（剩余职位数量）
        app.db.getActivity(activity.id).then((act) => {
            let posts = act.posts
            for (let p in posts) {
                posts[p].isApplyed = (posts[p].volunteerList.indexOf(app.globalData.userInfo.volunteerInfo.id) != -1)
            }
            this.setData({
                posts: posts
            })
        })
    },
    // 回调app方法访问数据库
    applyPost: function (e) {
        app.db.applyPost(e.target.dataset.post).then(() => {
            qq.showToast({
                title: "申请成功",
            })
            this.updatePost()
        }).catch((msg) => {
            qq.showToast({
                title: msg,
                image: "/images/icons/失败.png"
            })
        })
    },
    canclePost: function (e) {
        app.canclePost(e.target.dataset.post).then(() => {
            qq.showToast({
                title: "取消成功",
            })
            this.updatePost()
        }).catch((msg) => {
            qq.showToast({
                title: msg,
                image: "/images/icons/失败.png"
            })
        })
    },
    deleteAct: function () {
        qq.showModal({
            title: '确认',
            content: '确定要删除此活动吗?',
            success() {
                qq.showToast({
                    icon: 'success',
                    title: '删除成功'
                })
            },
            fail() {

            }
        })
    }
})
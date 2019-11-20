const app = getApp()

Page({
    data: {
        activity: null,
        posts: null,
        autoSize: {},
        applySuccess: true,
        actType: '',  // work/vol
    },
    onLoad: function(option) {
        let activity = app.db.getActivity(option.id);
        this.setData({
            activity: activity,
            posts: this.updatePost(activity),
            applySuccess: true,
            actType: option.actType
        })
    },
    // 事件函数
    autoImage: function(e) {
        var imgScale = e.detail.width / e.detail.height
        var that = this
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    autoSize: { width: res.windowWidth, height: res.windowWidth / imgScale }
                })
            }
        })
    },
    updatePost: function(activity = this.data.activity) {
        // 由于post 可能随时更新（剩余职位数量）
        let posts = app.db.getActivityPosts(activity)
        for (let p in posts) {
            posts[p].isApplyed = (app.globalData.userInfo.volunteerInfo.ongoingPosts.indexOf(posts[p].id) != -1)
        }
        return posts;
    },
    // 回调app方法访问数据库
    applyPost: function(e) {
        let success = app.db.applyPost(e.target.dataset.post)
        if (!success) {
            this.setData({
                applySuccess: false,
            })
        }
        this.setData({
            posts: this.updatePost()
        })
    },
    canclePost: function(e) {
        app.canclePost(e.target.dataset.post)
        this.setData({
            posts: this.updatePost()
        })
    },
    hideModal: function(e) {
        this.setData({
            applySuccess: true,
        })
    },
    deleteAct: function() {
        qq.showModal({
            title: '确认',
            content: '确定要删除此活动吗?',
            success () {
                qq.showToast({
                    icon: 'success',
                    title: '删除成功'
                })
            },
            fail () {

            }
        })
    }
})
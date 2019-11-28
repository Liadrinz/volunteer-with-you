const app = getApp()

Page({
    data: {
        posts: [],
        autoSize: {},
        actType: '',  // work/vol
        activity: {
            title: '',
            location: '',
            startTime: '',
            endTime: '',
            projectDetail: ''
        }
    },
    onLoad: function (option) {
        var that = this
        app.db.getActivity(option.id).then((value) => {
            let posts = that.data.posts;
            let data = this.updatePost(value);
            if (data) {
                posts.push(...data);
            }
            that.setData({
                activity: value,
                posts: posts,
                actType: option.actType
            })
        })
    },
    _getPostForm() {
        return {
            id: '',
            postname: '',
            requirement: '',
            postDetail: '',
            max: '',
        };
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
                console.log(p)
                console.log(posts[p])
                if (posts[p].volunteerList)
                    posts[p].isApplyed = (posts[p].volunteerList.indexOf(app.globalData.userInfo.volunteerInfo.id) != -1)
                // 加一组假数据
                posts[p].volunteerList = [{ id: 1, name: '吴志镛', schoolid: '20172118xx', credit: 100, hour: 1000 }, { id: 1, name: '陈凌云', schoolid: '20172118xx', credit: 100, hour: 80 }]
                console.log(posts[p])
            }
            console.log(posts)
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
    handleActChanges(e) {
        let prop = e.currentTarget.dataset.prop;
        let act = this.data.activity;
        act[prop] = e.detail.value;
        this.setData({ act: act });
    },
    handlePostChanges(e) {
        let ds = e.currentTarget.dataset;
        let posts = this.data.posts;
        posts[ds.index][ds.prop] = e.detail.value;
        this.setData({ posts: posts });
    },
    addPost() {
        let posts = this.data.posts;
        posts.push(this._getPostForm());
        this.setData({
            posts: posts
        })
    },
    deletePost(e) {
        let index = e.currentTarget.dataset.index;
        let posts = this.data.posts;
        posts.splice(index, 1);
        this.setData({
            posts: posts
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
    },
    deleteVol(e) {
        let ds = e.currentTarget.dataset;
        let i = parseInt(ds.postindex), j = parseInt(ds.volindex);
        let posts = this.data.posts;
        posts[i].volunteerList.splice(j, 1);
        this.setData({
            posts: posts
        })
    },
    updateAct() {
        console.log(this.data.activity, this.data.posts)
    }
})
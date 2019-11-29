const app = getApp()

Page({
    data: {
        posts: [],
        autoSize: {},
        actType: '', // work/vol
        activity: {
            opp_id: '',
            title: '',
            location: '',
            startTime: '',
            endTime: '',
            projectDetail: ''
        },
        imgList: [],
    },
    onLoad: function(option) {
        var that = this
        app.db.getActivity(option.id).then((value) => {
            console.log(value);
            let posts = that.data.posts;
            let data = this.updatePost(value);
            console.log(data)
            if (data) {
                posts.push(...data);
            }
            let imgList = that.data.imgList;
            if (value.picture != null && value.picture.match(/https?:\/\/(.+\/)+.*/) != null) {
                let paths = value.picture.split('/');
                let url = app.db._privateData.staticUrl + paths[paths.length - 1]
                imgList.push(url);
            }
            that.setData({
                activity: value,
                posts: posts,
                actType: option.actType,
                imgList: imgList
            })
            console.log(that.data.imgList);
        })
    },
    _getPostForm() {
        return {
            job_id: '',
            postname: '',
            requirement: '',
            postDetail: '',
            max: '',
        };
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
        app.db.getActivity(activity.id).then((act) => {
            let posts = act.posts

            if (app.globalData.userInfo.userType == "vol") {
                for (let p in posts) {
                    if (posts[p].volunteers)
                        posts[p].isApplyed = (posts[p].volunteers.indexOf(app.globalData.userInfo.volunteerInfo.id) != -1)
                }
            }
            this.setData({
                posts: posts
            })
        })
    },
    // 回调app方法访问数据库
    applyPost: function(e) {
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
    canclePost: function(e) {
        app.db.canclePost(e.target.dataset.post).then(() => {
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
    deleteAct: function() {
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
        let i = parseInt(ds.postindex),
            j = parseInt(ds.volindex);
        let posts = this.data.posts;
        posts[i].volunteerList.splice(j, 1);
        this.setData({
            posts: posts
        })
    },
    updateAct() {
        let act = {};
        Object.assign(act, this.data.activity);
        act['startTime'] = new Date(act['startTime'])
        act['endTime'] = new Date(act['endTime'])
        if (this.data.imgList.length > 0 && this.data.activity['picture'] !== this.data.imgList[0]) {
            app.db.uploadImage(this.data.imgList[0]).then((data) => {
                let paths = data.data.split('/');
                act['picture'] = app.db._privateData.staticUrl + paths[paths.length - 1];
                app.db.updateEvent(act, this.data.posts, 1).then(() => {
                    qq.navigateBack();
                    qq.showToast({
                        title: '修改成功'
                    })
                }).catch(() => {
                    qq.showToast({
                        title: '修改失败'
                    })
                })
            })
        } else {
            act['picture'] = null;
            app.db.updateEvent(act, this.data.posts, 1).then(() => {
                qq.navigateBack();
                qq.showToast({
                    title: '修改成功'
                })
            }).catch(() => {
                qq.showToast({
                    title: '修改失败'
                })
            });
        }
    },
    chooseImage() {
        qq.chooseImage({
            count: 1, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], //从相册选择
            success: (res) => {
                if (this.data.imgList.length != 0) {
                    this.setData({
                        imgList: this.data.imgList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        imgList: res.tempFilePaths
                    })
                }
                console.log(this.data.imgList);
            }
        });
    },
    delImg(e) {
        wx.showModal({
            title: '删除确认',
            content: '确定要删除这张照片?',
            cancelText: '取消',
            confirmText: '确定',
            success: res => {
                if (res.confirm) {
                    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
                    this.setData({
                        imgList: this.data.imgList
                    })
                }
            }
        })
    },
})
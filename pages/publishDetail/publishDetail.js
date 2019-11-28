const app = getApp();

var today = new Date().toLocaleDateString().replace(/[^0-9]/g, '-');

Page({
    data: {
        posts: [],
        activity: {
            title: '',
            location: '',
            startTime: today,
            endTime: today,
            projectDetail: ''
        }
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
    hidePubBtn() {

    },
    publishAct() {
        let act = {};
        Object.assign(act, this.data.activity);
        act['startTime'] += " 00:00:00";
        act['endTime'] += " 00:00:00";
        app.db.publishEvent(act, this.data.posts).then(() => {
            qq.showToast({
                title: "提交成功"
            })
            qq.navigateBack()
        }).catch(() => {
            qq.showToast({
                image:"/images/icons/失败.png",
                title: "失败"
            })
        })
    }
})
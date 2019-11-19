const app = getApp();

Page({
    data: {
        posts: [],
        activity: {
            location: '',
            startTime: '',
            endTime: '',
            detail: ''
        }
    },
    _getPostForm() {
        return {
            id: '',
            name: '',
            condition: '',
            description: ''
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
        console.log(posts);
        this.setData({
            posts: posts
        })
    },
    handleActChanges(e) {
        let prop = e.currentTarget.dataset.prop;
        let act = this.data.activity;
        act[prop] = e.detail.value;
        this.setData({act: act});
    },
    handlePostChanges(e) {
        let ds = e.currentTarget.dataset;
        let posts = this.data.posts;
        posts[ds.index][ds.prop] = e.detail.value;
        this.setData({posts: posts});
    },
    publishAct() {
        console.log("活动字段: ", this.data.activity);
        console.log("岗位列表", this.data.posts);
        if (done) {
            qq.showToast({
                icon: 'success',
                title: "发布成功",
                success() {
                    qq.navigateBack();
                }
            })
        } else {
            qq.showToast({
                icon: 'none',
                title: "发布失败, 请稍后重试"
            })
        }
    }
})
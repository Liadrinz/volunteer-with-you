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
            projectDetial: ''
        },
        imgList: []
    },
    _getPostForm() {
        return {
            postname: '',
            requirement: '',
            postDetial: '',
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
        console.log(e);
        let prop = e.currentTarget.dataset.prop;
        let act = this.data.activity;
        act[prop] = e.detail.value;
        this.setData({ activity: act });
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
        act['startTime'] = new Date(act['startTime'])
        act['endTime'] = new Date(act['endTime'])
        if (this.data.imgList.length > 0) {
            app.db.uploadImage(this.data.imgList[0]).then((data) => {
                let paths = data.data.split('/');
                act['picture'] = app.db._privateData.staticUrl + paths[paths.length - 1];
                app.db.publishEvent(act, this.data.posts, app.globalData.userInfo.volunteerInfo.id).then(()=>{
                    qq.navigateBack();
                    let pages = getCurrentPages();
                    pages[pages.length - 2].refresh();
                })
            }).catch((e) => {
                console.log(e);
            })
        } else {
            app.db.publishEvent(act, this.data.posts, app.globalData.userInfo.volunteerInfo.id).then(()=>{
                qq.navigateBack();
                let pages = getCurrentPages(); 
                pages[pages.length - 2].refresh();
            })
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
    }
})
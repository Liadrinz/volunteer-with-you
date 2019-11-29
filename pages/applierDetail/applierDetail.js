const app = getApp()
var actId = null

Page({
    data: {
        posts: null,
        selectall: false,
    },
    onLoad(option) {

        actId = option.id
        app.db.getAppliers(option.id).then((posts) => {
            for (let p of posts.posts) {
                p.selectall = false
                p.selectNum = 0
                for (let v of p.volunteers) {
                    v.select = false
                }
            }
            this.setData({
                posts: posts.posts
            })
        })
    },
    selectAll(e) {
        let pindex = e.currentTarget.dataset.pindex
        this.data.posts[pindex].selectall = !this.data.posts[pindex].selectall
        if (this.data.posts[pindex].selectall)
            for (let vol of this.data.posts[pindex].volunteers) {
                // if(this.data.posts[pindex].selectNum == this.data.posts[pindex].max)
                //     break
                vol.select = true
                this.data.posts[pindex].selectNum++
            }
        else {
            for (let vol of this.data.posts[pindex].volunteers) {
                this.data.posts[pindex].selectNum = 0
                vol.select = false
            }
        }
        this.setData({
            posts: this.data.posts
        })
        //posts
    },
    selectVol(e) {
        for (let p of this.data.posts) {
            p.selectNum = 0
            for (let v of p.volunteers) {
                v.select = false
            }
        }
        for (let v of e.detail.value) {
            this.data.posts[v[0]].volunteers[v[2]].select = true
            this.data.posts[v[0]].selectNum++
        }
        this.setData({
            posts: this.data.posts
        })
    },
    refuseApplies() {
        let applies = []
        for (let p of this.data.posts) {
            var applyInfo = {}
            console.log(this.data.posts)
            applyInfo.post_id = p.id
            var vols = []
            for (let v of p.volunteers) {
                if (v.select) {
                    vols.push(v.id)
                }
            }
            applyInfo.volunteers = vols
            app.db.acceptApply(applyInfo).then(() => {
                qq.showToast({
                    title: "处理成功",
                })
                app.db.getAppliers(actId).then((posts) => {
                    for (let p of posts.posts) {
                        p.selectall = false
                        p.selectNum = 0
                        for (let v of p.volunteers) {
                            v.select = false
                        }
                    }
                    this.setData({
                        posts: posts.posts
                    })
                })
            })
            applies.push(applyInfo)
        }

        // app.db.acceptApply(applies).then(() => {
        //     qq.showToast({
        //         title: "处理成功",
        //     })
        // })
    },
}) 
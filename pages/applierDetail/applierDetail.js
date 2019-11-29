const app = getApp()

Page({
    data: {
        posts: null,
        selectall: false,
        
    },
    onLoad(option) {
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
                if(this.data.posts[pindex].selectNum == this.data.posts[pindex].max)
                    break
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
            this.data.posts[v[0]].selectNum ++
        }
        this.setData({
            posts: this.data.posts
        })
    },
    accpetApplies(){
        let applies = []
        for(let p of this.data.posts){
            applies.push(p.id)
            var vols = []
            for(let v of p.volunteers){
                if(v.select){
                    vols.push(v.id)
                }
            }
            applies.push(vols)
        }
        app.db.acceptApply(applies).then(()=>{
            qq.showToast({
                title:"处理成功",
            })
        })
    },
})
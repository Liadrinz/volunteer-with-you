const app = getApp()
Page({
    data:{
        posts:null
    },
    onLoad(option){
        app.db.getAppliers(option.id).then((posts)=>{
            console.log(posts.posts)
            this.setData({
                posts:posts.posts
            })
        })
    }
})
const app = getApp()

Page({
    data:{
        activity:null,
        posts:null,
        autoSize:{}
    },   
    onLoad:function(option){
        let activity = app.GetActivity(option.id);
        this.setData({
            activity:activity,
            posts:app.GetActivityPosts(activity),
        })
    },
    autoImage:function(e){
        var imgScale = e.detail.width/e.detail.height
        var that = this
        wx.getSystemInfo({
            success:function(res){
                that.setData({ 
                    autoSize:{width:res.windowWidth,height:res.windowWidth/imgScale}
                })
            }
        })    
    }
})
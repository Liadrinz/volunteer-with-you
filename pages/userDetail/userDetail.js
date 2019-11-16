var usersComp = null
var infos2show = null //要求显示的活动条目

Page({
    data:{
        type:null,// 0 时间记录 1 未完成项目查看
        infos2show:null,
    },
    onLoad:function(option){
        this.setData({
            type:parseInt(option.type)
        })
        let pages = getCurrentPages()
        // 获取到 父页面的 user Component 组件
        usersComp = pages[pages.length-2].selectComponent("#users")
    },
    onShow:function(){
        usersComp.updateData()
        this.setData({
            infos2show : usersComp.getInfo2Show(this.data.type)
        })
        switch(this.data.type){
            case 0:
                this.showFinished()
                break
            case 1:
                this.showOnGoing()
                break
            default:
                break
        }
    },
    showOnGoing(){
    },
    showFinished(){
    },

})
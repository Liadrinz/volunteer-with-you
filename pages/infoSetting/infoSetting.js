var usersComp;
var inputs;
Page({
    data: {
        volunteerInfo: null,
        canSubmit: false,
    },
    onLoad: function () {
        let pages = getCurrentPages()
        // 获取到 父页面的 user Component 组件
        usersComp = pages[pages.length - 2].selectComponent("#users")
        this.data.volunteerInfo = usersComp.data.userInfo.volunteerInfo
        inputs = this.selectAllComponents('#customInput')
        for (let i in inputs) {
            let name = inputs[i].data.name
            let attr = this.data.volunteerInfo[name]
            if (attr != null) {
                inputs[i].reset(attr)
            }
        }
    },


    validateCallBack: function (e) {
        this.setData({
            canSubmit: e.detail
        })
    },
    formSubmit: function (e) {
        if (this.data.canSubmit) {
            usersComp.submitVolInfo(e.detail.value)
            for (let i in inputs) {
                inputs[i].reset(inputs[i].data.value)
            }
            qq.showToast({
                title: '提交成功',
                icon:"success",
            })
        } else {
            qq.showToast({
                title: '格式不正确',
                image: "/images/icons/失败.png",
            })
        }

    },
    formReset: function (e) {
        for (let i in inputs) {
            inputs[i].reset()
        }
        qq.showToast({
            title:"重置成功",
        })
    }


})
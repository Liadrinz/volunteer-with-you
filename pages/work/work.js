const app = getApp();
Component({
    properties: {
        activityList: {
            type: Array,
            value: [],
        },
    },
    data: {
        tabCur: 0,
        scrollLeft: 0,
        tabs: ['活动发布', '申请处理'],
        activityComp: null,
        showFloatBtn: true,
    },
    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function() {
            this.data.activityComp = this.selectComponent("#acts")
        },
    },
    methods: {
        tabSelect(e) {
            this.setData({
                tabCur: e.currentTarget.dataset.id,
                srollLeft: (e.currentTarget.dataset.id - 1) * 60
            })
        },
        showBtn() {
            this.setData({
                showFloatBtn: true
            })
        },
        hideBtn() {
            this.setData({
                showFloatBtn: false
            })
        }
    }
})
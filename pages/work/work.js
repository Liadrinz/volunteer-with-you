const app = getApp();

Component({
    properties: {
        actList: {
            type: Array,
            value: []
        }
    },
    data: {
        tabCur: 0,
        scrollLeft: 0,
        tabs: ['活动发布', '申请处理']
    },
    methods: {
        tabSelect(e) {
            this.setData({
                tabCur: e.currentTarget.dataset.id,
                srollLeft: (e.currentTarget.dataset.id - 1) * 60
            })
        }
    }
})
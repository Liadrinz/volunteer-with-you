const app = getApp();
const that = this;

Component({
    data: {
        actList: [],
        showFloatBtn: true
    },
    lifetimes: {
        attached() {
            let pages = getCurrentPages();
            let act = pages[pages.length - 1].selectComponent("#acts");
            act.setData({
                onGetAct: (actList) => {
                    that.setData({
                        actList: actList
                    })
                }
            });
        }
    },
    methods: {
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
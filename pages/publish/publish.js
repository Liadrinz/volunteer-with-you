const app = getApp();
const that = this;

Component({
    data: {
        actList: [],
        showFloatBtn: true
    },
    lifetimes: {},
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
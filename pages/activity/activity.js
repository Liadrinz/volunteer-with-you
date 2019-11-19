const app = getApp();

var that;

Component({
    properties: {
        actType: {
            type: String,
            value: ''
        },
        activityList: {
            type: Array,
            value: []
        }
    },
    lifetimes: {
        attached() {
            that = this;
        }
    },
    data: {
        showFloatBtn: true,
        search: (k) => {
            console.log(k);
        },
        filterOpen: () => {
            that.setData({
                showFloatBtn: false
            })
        },
        filterClose: () => {
            that.setData({
                showFloatBtn: true
            })
        },
        filterFields: [
            { name: "地区", type: "single", choices: ["海淀区", "昌平区"] },
            { name: "开始时间", type: "date" },
            { name: "结束时间", type: "date" },
        ]
    },
    methods: {
        
    }
})
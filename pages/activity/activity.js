const app = getApp();

var that;

Component({
    properties: {
        showFloatBtn: {
            type: Boolean,
            value: true
        },
        actType: {
            type: String,
            value: ''
        },
        activityList: {
            type: Array,
            value: []
        },
        loading:{
            type:Boolean,
            value:false,
        },
        isrunout:{
            type:Boolean,
            value:false,
        },
    },
    lifetimes: {
        attached() {
            that = this;
        }
    },
    data: {
        search: (k) => {
            console.log(k);
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
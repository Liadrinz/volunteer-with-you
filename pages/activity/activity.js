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
        filter: (f) => {
            console.log(f)
            console.log(f);
        },
        filterFields: [
            { name: "开始时间",attrname:"startTime",type: "date" },
            { name: "结束时间",attrname:"endTime",type: "date" },
            { name: "地区",attrname:"location", type: "multiple", choices: app.db.getAllLocations()}
        ]
    },
    methods: {
        
    }
})
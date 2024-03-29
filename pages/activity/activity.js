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
        loading: {
            type: Boolean,
            value: false,
        },
        isrunout: {
            type: Boolean,
            value: false,
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
            { name: "开始时间", attrname: "startTime", type: "date" },
            { name: "结束时间", attrname: "endTime", type: "date" },
            { name: "地区", attrname: "location", type: "multiple", choices: app.db.getAllLocations() }
        ],
        genCodeForm: {
            opp_id: '',
            job_id: '',
            count: '',
            time: '',
            memo: '000'
        }
    },
    methods: {
        genCode(e) {
            let ds = e.currentTarget.dataset;
            qq.navigateTo({
                url: '/pages/code/code?opp_id=' + ds.opp + '&job_id=' + ds.job
            })
            // let form = this.data.genCodeForm;
            // form.opp_id = ds.opp;
            // form.job_id = ds.job;
            // this.setData({
            //     genCodeForm: form
            // })
            // this.showModal()
        }
    }
})
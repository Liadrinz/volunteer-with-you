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
            console.log(f);
        },
        filterFields: [
            { name: "开始时间", type: "date" },
            { name: "结束时间", type: "date" },
            { name: "地区", type: "multiple", choices: app.db.getAllLocations()}
        ],
        modalShown: false,
        genCodeForm: {
            opp_id: '',
            job_id: '',
            count: '',
            time: '',
            memo: '000'
        }
    },
    methods: {
        showModal() {
            this.setData({
                modalShown: true
            })
        },
        hideModal() {
            this.setData({
                modalShown: false
            })
        },
        genCode(e) {
            let ds = e.currentTarget.dataset;
            let form = this.data.genCodeForm;
            form.opp_id = ds.opp;
            form.job_id = ds.job;
            this.setData({
                genCodeForm: form
            })
            this.showModal()
        },
        genCodeSubmit(e) {
            let form = e.detail.value;
            let formTotal = this.data.genCodeForm;
            formTotal.count = form.count;
            formTotal.time = form.time;
            app.db.generateCode(formTotal)
                .then(() => {
                    qq.showToast({
                        title: "生成成功"
                    })
                    this.setData({
                        modalShown: false
                    })
                })
                .catch(() => {
                    qq.showToast({
                        title: "生成失败",
                        image: "/images/icons/失败.png",
                    })
                })
        }
    }
})
const app = getApp();

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
    data: {
        search: (k) => {
            console.log(k);
        },
        filterFields: [
            {name: "地区", type: "single", choices: ["海淀区", "昌平区"]},
            {name: "开始时间", type: "date"},
        ]
    },
    methods: {

    }
})
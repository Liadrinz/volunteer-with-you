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
        }
    },
    methods: {

    }
})
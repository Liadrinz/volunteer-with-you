const app = getApp();
const that = this;


Component({
    data: {
        actList: [],
        showFloatBtn: true
    },
    lifetimes: {
        attached() {
            // let f = app.globalData.getSplit;
            let list = app.db.getActivities(10);
            let actList = this.data.actList;
            // for (let i = 0; i < list.length; ++i) {
            //     if (f(list[i]['beginRegTime'], " ")[0] === f(list[i]['endRegTime'], " ")[0])
            //         list[i]['endRegTime'] = f(list[i]['endRegTime'], " ")[1];
            //     if (f(list[i]['beginTime'], " ")[0] === f(list[i]['endTime'], " ")[0])
            //         list[i]['endTime'] = f(list[i]['endTime'], " ")[1];
            // }
            for (let item of list)
                actList.push(item);
            this.setData({ actList: actList });
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
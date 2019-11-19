const app = getApp();

Component({
    data: {
        applyList: [],
        search: (keywords) => {
            console.log(keywords);
        }
    },
    lifetimes: {
        attached() {
            let list = app.db.getApplies(10);
            let applyList = this.data.applyList;
            for (let item of list)
                applyList.push(item);
            this.setData({ applyList: applyList });
        }
    },
    methods: {
        
    }
})
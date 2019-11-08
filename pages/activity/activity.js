const app = getApp();

app.globalData.getSplit = function (dateTime, splitter) {
    return dateTime.split(splitter);
}

Page({
    data: {
        // 活动列表
        activityList: (() => {
            let f = app.globalData.getSplit;
            let list = [{ title: '教小朋友学Python', beginRegTime: '2019-10-01 09:00:00', endRegTime: '2019-10-07 00:00:00', beginTime: '2020-01-15', endTime: '2020-03-01', location: '北邮幼儿园' },
            { title: '地铁志愿', beginRegTime: '2019-10-01 18:00:00', endRegTime: '2019-10-01 19:00:00', beginTime: '2020-10-03', endTime: '2020-10-03', location: '地铁西土城站' },
            { title: 'QCon', beginRegTime: '2019-10-01 00:00:00', endRegTime: '2019-11-01 00:00:00', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心' }];
            for (let i = 0; i < list.length; ++i) {
                if (f(list[i]['beginRegTime'], " ")[0] === f(list[i]['endRegTime'], " ")[0])
                    list[i]['endRegTime'] = f(list[i]['endRegTime'], " ")[1];
                if (f(list[i]['beginTime'], " ")[0] === f(list[i]['endTime'], " ")[0])
                    list[i]['endTime'] = f(list[i]['endTime'], " ")[1];
            }
            return list;
        })(),
        keywords: ''
    },
    // 搜索输入
    handleSearchInput(e) {
        this.setData({
            keywords: e.detail.value
        })
    },
    // 触发搜索
    search() {
        console.log(this.data.keywords)
    }
})
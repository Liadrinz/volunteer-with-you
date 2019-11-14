const app = getApp();

app.globalData.getSplit = function(dateTime, splitter) {
    return dateTime.split(splitter);
}

Page({
    data: {
        // 活动列表
        activityList: (() => {
            let f = app.globalData.getSplit;
            let list = app.GetActivities(10)
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
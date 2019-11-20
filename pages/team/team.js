const app = getApp();

Component({
    properties: {

    },
    data: {
        teamInfo: null
    },
    lifetimes: {
        attached() {
            let teamInfo = app.db.getTeamInfo();
            this.setData({
                teamInfo: teamInfo
            })
        }
    },
    methods: {
        getTeamInfo() {
            return this.data.teamInfo;
        }
    }
})

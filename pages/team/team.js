const app = getApp();

Component({
    properties: {

    },
    data: {
        teamInfo: null
    },
    lifetimes: {
        attached() {
            this.getTeamInfo()
            // let teamInfo = app.db.getTeamInfo();
            // this.setData({
            //     teamInfo: teamInfo
            // })
        }
    },
    methods: {
        getTeamInfo() {
            app.db.getTeamInfo().then((teamInfo) => {
                this.setData({
                    teamInfo: teamInfo
                })
            })
            //return this.data.teamInfo;
        }
    }
})

const app = getApp();

Page({
    data: {
        userType: '',
        vol: {
            name: '',
            tel: '',
            grade: '',
            schoolid: '',
            qq: '',
            identity: '',
            description: ''
        },
        team: {
            teamname: '',
            tel: '',
            qq: '',
            schoolid: '',
            identity: '',
            teamdescription: ''
        }
    },
    onLoad(option) {
        this.setData({
            userType: app.globalData.userInfo.userType
        })
    },
    handleAllChanges(e) {
        let prop = e.currentTarget.dataset.prop;
        if (this.data.userType === 'vol') {
            let vol = this.data.vol;
            vol[prop] = e.detail.value;
            console.log(vol);
        } else {
            let team = this.data.team;
            team[prop] = e.detail.value;
            console.log(team);
        }
    },
    register() {
        qq.navigateBack();
        qq.navigateTo({
            url: '/pages/index/index'
        })
    },
    createTeam() {
        qq.navigateBack();
        qq.navigateTo({
            url: '/pages/index/index'
        })
    }
});
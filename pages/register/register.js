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
        } else {
            let team = this.data.team;
            team[prop] = e.detail.value;
        }
    },
    register() {
        app.db.setVolInfo(this.data.vol).then(()=>{
            qq.showToast({
                title:"注册成功",
            })    
            qq.navigateBack();
            qq.navigateTo({
                url: '/pages/index/index'
            })
        })
    },
    createTeam() {
        app.db.setTeamInfo(this.data.team).then(()=>{
            qq.navigateBack();
            qq.navigateTo({
                url: '/pages/index/index'
            })
        })
    }
});
var teamComp = null;
var teamInfo = null;
const app = getApp();

Page({
    data: {
        doingAct: [],
        volunteers: []
    },
    _getVolunteer() {
        return {
            volID: '',
            time: ''
        }
    },
    onLoad(option) {
        if (option.loggedIn === 'false') {
            qq.showToast({
                title: "请先登录",
                image: "/images/icons/失败.png",
            })
            qq.navigateBack();
        }
        let pages = getCurrentPages();
        teamComp = pages[pages.length-2].selectComponent("#team");
        teamInfo = teamComp.getTeamInfo();
        let doingAct = this.data.doingAct;
        for (let item of app.db.bjteamProjects) {
            item["title"] = item["name"]
            doingAct.push(item);
        }
        this.setData({
            doingAct: doingAct
        });
    },
    addVol() {
        let volunteers = this.data.volunteers;
        volunteers.push(this._getVolunteer());
        this.setData({
            volunteers: volunteers
        })
    },
    deleteVol(e) {
        let index = e.currentTarget.dataset.index;
        let volunteers = this.data.volunteers;
        volunteers.splice(index, 1);
        this.setData({
            volunteers: volunteers
        })
    },
    handleVolChanges(e) {
        let ds = e.currentTarget.dataset;
        let volunteers = this.data.volunteers;
        volunteers[ds.index][ds.prop] = e.detail.value;
        this.setData({
            volunteers: volunteers
        })
    },
    sendCode() {
        let data = this.data.volunteers;
        console.log(data);
    }
})
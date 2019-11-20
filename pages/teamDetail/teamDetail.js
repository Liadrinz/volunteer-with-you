var teamComp = null;
var teamInfo = null;
const app = getApp();

Page({
    data: {
        type: '',
        doneAct: [],
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
        this.setData({
            type: option.type
        })
        if (option.type == 1 || option.type == 2) {
            let pages = getCurrentPages();
            teamComp = pages[pages.length-2].selectComponent("#team");
            teamInfo = teamComp.getTeamInfo();
            if (option.type == 1) {
                let doneAct = this.data.doneAct;
                let doneIds = teamInfo.activities.done;
                for (let id of doneIds) {
                    doneAct.push(app.db.getActivity(id));
                }
                this.setData({
                    doneAct: doneAct
                });
            } else if (option.type == 2) {
                let doingAct = this.data.doingAct;
                let doingIds = teamInfo.activities.doing;
                for (let id of doingIds) {
                    doingAct.push(app.db.getActivity(id));
                }
                this.setData({
                    doingAct: doingAct
                });
            }
        } else {
            this.addVol();
        }
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
        console.log(this.data.volunteers);
    }
})
const app = getApp();

Page({
    data: {
        genCodeForm: {
            opp_id: '',
            job_id: '',
            count: '',
            time: '',
            memo: '000'
        },
        codeGroupIdx: null,
        codeGroups: [],
        modalName: null,
        volList: [],
        reachLimit: false,
        toggles: [],
        selectall: false,
    },
    onLoad(option) {
        let form = this.data.genCodeForm;
        form.opp_id = option.opp_id;
        form.job_id = option.job_id;
        this.setData({
            genCodeForm: form
        })
        let getCodeGroup = (time) => {
            return {
                codes: [],
                time: time
            }
        }
        app.db.getCodes(option.opp_id, option.job_id).then((codes) => {
            let codeGroups = {};
            for (let code of codes) {
                let tar = codeGroups[code.time];
                if (tar === undefined) {
                    codeGroups[code.time] = getCodeGroup(code.time);
                    codeGroups[code.time].codes.push(code.code);
                } else {
                    tar.codes.push(code.code);
                }
            }
            let list = this.data.codeGroups;
            for (let key in codeGroups) {
                list.push(codeGroups[key])
            }
            this.setData({
                codeGroups: list
            })
        })
    },
    handleChanges(e) {
        let prop = e.currentTarget.dataset.prop;
        let form = this.data.genCodeForm;
        form[prop] = e.detail.value;
        this.setData({
            genCodeForm: form
        })
    },
    genCodeSubmit(e) {
        let formTotal = this.data.genCodeForm;
        app.db.generateCode(formTotal)
            .then(() => {
                qq.showToast({
                    title: "生成成功"
                })
                this.setData({
                    modalShown: false
                })
                app.db.getCodes(this.data.genCodeForm.opp_id, this.data.genCodeForm.job_id).then((codes) => {
                    let codeGroups = {};
                    for (let code of codes) {
                        let tar = codeGroups[code.time];
                        if (tar === undefined) {
                            codeGroups[code.time] = getCodeGroup(code.time);
                            codeGroups[code.time].codes.push(code.code);
                        } else {
                            tar.codes.push(code.code);
                        }
                    }
                    let list = this.data.codeGroups;
                    for (let key in codeGroups) {
                        list.push(codeGroups[key])
                    }
                    this.setData({
                        codeGroups: list
                    })
                })
            })
            .catch(() => {
                qq.showToast({
                    title: "生成失败",
                    image: "/images/icons/失败.png",
                })
            })
    },
    assignCode(e) {
        this.setData({
            codeGroupIdx: e.currentTarget.dataset.index
        })
        console.log(this.data.genCodeForm.job_id)
        app.db.getBVProjectUsers(this.data.genCodeForm.job_id).then((volList) => {
            console.log(volList)
            this.setData({
                modalName: 'assignModal',
                volList: volList,
                codeGroupIdx: e.currentTarget.dataset.index
            })
        })
        //codeGroupIdx = e.currentTarget.dataset.index
        // })
    },
    assign() {
        let sendvolId = []
        for (let vol of this.data.volList) {
            sendvolId.push(vol.id)
        }
        let group = this.data.codeGroups[this.data.codeGroupIdx]
        let sendcodes = group.codes
        sendcodes = sendcodes.slice(0, sendvolId.length)
        app.db.assignCodes(sendvolId, sendcodes, this.data.genCodeForm.job_id, group.time)

    },
    hideModal() {
        this.setData({
            modalName: null,
            reachLimit: false
        })
    },
    toggleVol(e) {
        this.data.toggles = e.detail.value
        for (let i in this.data.volList) {
            if (this.data.toggles.indexOf(i) != -1) {
                this.data.volList[i].ischecked = true
            } else
                this.data.volList[i].ischecked = false
        }
        if (this.data.toggles.length === this.data.codeGroups[this.data.codeGroupIdx].codes.length) {
            this.setData({
                reachLimit: true,
                volList: this.data.volList,
                toggles: this.data.toggles
            })
        } else {
            this.setData({
                reachLimit: false,
                volList: this.data.volList,
                toggles: this.data.toggles
            })
        }
    },
    selectall() {

        this.data.selectall = !this.data.selectall
        for (let i in this.data.volList) {
            this.data.volList[i].ischecked = this.data.selectall
        }
        this.setData({
            selectall:this.data.selectall,
            volList:this.data.volList,
        })
    },
})
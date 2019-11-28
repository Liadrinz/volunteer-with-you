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
        codeGroups: []
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
    assign(e) {

    },
    assignAll() {

    }
})
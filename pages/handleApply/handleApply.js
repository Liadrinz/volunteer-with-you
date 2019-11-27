const app = getApp();

Component({
    data: {
        all: false,
        applyList: [],
        checkBoxFlags: [],
        selected: [],
        search: (keywords) => {
            console.log(keywords);
        },
        btnShown: true
    },
    lifetimes: {
        attached() {
            let list = app.db.getApplies(10);
            let applyList = this.data.applyList;
            let checkBoxFlags = this.data.checkBoxFlags;
            for (let item of list) {
                applyList.push(item);
                checkBoxFlags.push(false);
            }
            this.setData({ applyList: applyList, checkBoxFlags: checkBoxFlags });
        }
    },
    methods: {
        selectAll() {
            if (!this.data.all) {
                let selected = this.data.selected;
                let checkBoxFlags = this.data.checkBoxFlags;
                selected = Object.keys(checkBoxFlags);
                for (let i = 0; i < checkBoxFlags.length; ++i) {
                    checkBoxFlags[i] = true;
                }
                this.setData({
                    selected: selected,
                    checkBoxFlags: checkBoxFlags
                });
            } else {
                let selected = this.data.selected;
                let checkBoxFlags = this.data.checkBoxFlags;
                selected = [];
                for (let i = 0; i < checkBoxFlags.length; ++i) {
                    checkBoxFlags[i] = false;
                }
                this.setData({
                    selected: selected,
                    checkBoxFlags: checkBoxFlags
                });
            }
            this.setData({
                all: !this.data.all
            });
        },
        handleCheck(e) {
            let selected = this.data.selected;
            let checkBoxFlags = this.data.checkBoxFlags;
            selected = e.detail.value;
            let allIdx = selected.indexOf("all");
            if (allIdx !== -1)
                selected.splice(allIdx, 1);
            for (let i = 0; i < checkBoxFlags.length; ++i) {
                checkBoxFlags[i] = false;
            }
            for (let i of selected) {
                checkBoxFlags[i] = true;
            }
            this.setData({
                selected: selected,
                checkBoxFlags: checkBoxFlags
            });
        },
        showBtn() {
            this.setData({
                btnShown: true
            })
        },
        hideBtn() {
            this.setData({
                btnShown: false
            })
        },
        admitAll() {
            console.log(this.data.selected);
        },
        rejectAll() {
            console.log(this.data.selected);
        }
    }
})
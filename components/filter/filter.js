const app = getApp();

Component({
    properties: {
        fields: {
            type: Array,
            value: []
        },
        onFilter: {
            type: Function,
            value: (filters) => { }
        },
        onCancel: {
            type: Function,
            value: () => { }
        },
        onFilterOpen: {
            type: Function,
            value: () => { }
        },
        onFilterClose: {
            type: Function,
            value: () => { }
        },
    },
    data: {
        filtered: false,
        showFilter: false,
        filters: {}
    },
    lifetimes: {
        attached() {
            let filters = this.data.filters;
            for (let field of this.properties.fields) {
                switch (field.type) {
                    case 'date':
                        filters[field.name] = new Date().toLocaleDateString().replace(/[^0-9]/g, '-');
                        break;
                    case 'multiple':
                        filters[field.name] = [];
                        break;
                    default:
                        filters[field.name] = '';
                        break;
                }

            }
            this.setData({ filters: filters });
        }
    },
    methods: {
        filter() {
            this.setData({
                filtered: true
            })
            this.properties.onFilter(this.data.filters);
            this.hideFilterModal();
        },
        cancelFilter() {
            this.setData({
                filtered: false
            })
            this.properties.onCancel();
            this.hideFilterModal();
        },
        showFilterModal() {
            this.properties.onFilterOpen();
            this.setData({
                showFilter: true
            })
        },
        hideFilterModal() {
            this.properties.onFilterClose();
            this.setData({
                showFilter: false
            })
        },
        // 处理所有过滤表单值的变化
        allChangeHandler(e) {
            console.log(e);
            let value = e.detail.value;
            let name = e.currentTarget.dataset.name;
            let filters = this.data.filters;
            filters[name] = value;
            this.setData({ filters: filters });
        },

        handleMultiple(e) {

        }
    }
})
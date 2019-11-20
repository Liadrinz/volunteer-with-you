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
            this.properties.onFilter(filters);
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
            let value = e.detail.value;
            let name = e.currentTarget.dataset.name;
            let filters = this.data.filters;
            filters[name] = value;
            this.setData({ filters: filters });
        }
    }
})
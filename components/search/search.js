const app = getApp();

Component({
    behaviors: [],
    properties: {
        onSearch: {
            type: Function,
            value: (keywords) => { }
        },
        onFilter: {
            type: Function,
            value: (filter) => { }
        },
        filterFields: {
            type: Array,
            value: null
        },
        onFilterOpen: {
            type: Function,
            value: () => {}
        },
        onFilterClose: {
            type: Function,
            value: () => {}
        }
    },
    data: {
        keywords: ''
    },
    methods: {
        handleSearchInput(e) {
            this.setData({
                keywords: e.detail.value
            });
        },
        search() {
            this.properties.onSearch(this.data.keywords);
        }
    }
})
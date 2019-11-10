const app = getApp();

Component({
    behaviors: [],
    properties: {
        onSearch: {
            type: null,
            value: () => { }
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
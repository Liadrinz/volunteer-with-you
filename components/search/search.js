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
            value: () => { }
        },
        onFilterClose: {
            type: Function,
            value: () => { }
        }
    },
    data: {
        keywords: '',
        search: null,
    },
    lifetimes: {
        attached() {
            console.log(this.data.keywords)
            let that = this
            this.setData({
                search: (info)=>{that.properties.onSearch(_packSearchFliter(that.data.keywords, info))   }
            })
        }
    },
    methods: {
        search(info){
            var fliter = this.selectComponent("#fliter")
            this.properties.onSearch(_packSearchFliter(this.data.keywords,fliter.filters))
        },
        handleSearchInput(e) {
            this.setData({
                keywords: e.detail.value
            });
        },
    }
})

var _packSearchFliter = function (keywords, filterInfo) {
    return {
        searchkeyword: keywords,
        ...filterInfo,
    }
}
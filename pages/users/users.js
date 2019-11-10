Component({
  data: {
    userInfo:null ,
  },
  options: {
    addGlobalClass: true,
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { 
      this.setData({
        userInfo : getApp().globalData.userInfo
      }) 
    },
  },
  methods: {
    
  }
})

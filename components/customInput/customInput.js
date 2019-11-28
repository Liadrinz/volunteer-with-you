const validator = require("../../utils/validator.js")
Component({
    behaviors:['wx://form-field'],
    properties:{
        inputType:{
            type:String,
            value:"text",
        },
        placeholder:{
            type:String,
            value:"input",
        },
        title:{
            type:String,
            value:"title",
        },
        maxLength:{
            type:Number,
            value:-1
        },
        minLength:{
            type:Number,
            value:-1,
        },
        validateFunc:{
            type:String,
            value:"text",
        },
        defaultvalue:{
            type:String,
            value:'',
        }
    },
    data:{
        viable:true,
        value:'',
    },
    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function() {
            console.log(validator[this.data.validateFunc](this.data.defaultvalue))
            this.setData({
                viable:validator[this.data.validateFunc](this.data.defaultvalue,this.properties.minLength),
                value:this.data.defaultvalue
            })
        },
    },
    options: {
        addGlobalClass: true,
    },
    methods:{
        validate(e){
            this.setData({
                viable:validator[this.data.validateFunc](e.detail.value,this.data.minLength),
                value:e.detail.value
            })
            this.triggerEvent("validate",this.data.viable,{bubbles:true})
        },
        clearInput(e){
            this.setData({
                value:''
            })
        },
        reset(val=this.data.defaultvalue){
            this.setData({
                defaultvalue:val,
                value:val,
                viable:validator[this.data.validateFunc](val)
            })
        }

    } 

})
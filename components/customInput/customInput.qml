<view class="{{viable == false?'bg-radial-gradual-yellow':''}} cu-form-group solid" bindresetVal="reset">
    <view class="title">{{title}}</view>
    <input value="{{value}}" maxlength="{{maxLength}}"  bindinput="validate" type="{{inputType}}" placeholder="{{placeholder}}"></input>
    <view wx:if="{{value!=''}}" bindtap="clearInput" class="cuIcon-close {{viable == false?'text-red':''}} text-bold" style="padding:12px"/>
</view> 
<view>
  <view class="cu-bar fixed bg-gradual-red" style="height: 4rem;">
    <view slot="content" style="width: 100%; text-align: center; margin-top: 1rem;">
      <view style="text-align: center;">
        <text class="text-xl">志愿邮你</text>
      </view>
    </view>
  </view>
  <view class="body" style="margin-top: 5rem;">
    <activity wx:if="{{router === 'vol'}}" />
    <personal wx:if="{{router === 'me'}}" />
  </view>
  <view class="cu-bar tabbar bg-white foot">
    <view class="action" bindtap="toVol">
      <view class="text-{{volClr}}">
        <text class="cuIcon-like"></text>
        志愿活动
      </view>
    </view>
    <view class="action" bindtap="toMe">
      <view class="text-{{meClr}}">
        <text class="cuIcon-people"></text>
        个人中心
      </view>
    </view>
  </view>
</view>

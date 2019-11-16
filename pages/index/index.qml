<view>
  <view class="cu-bar fixed bg-gradual-red" style="height: 4rem;"></view>
  <view class="body">
    <view wx:if="{{router === 'vol'}}" style="margin-top: 5rem;"><activity/></view>
    <view wx:elif="{{router === 'me'}}" style="margin-top: 4rem;" ><users id="users" /></view>
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

<view class="UCenter-bg bg-gradual-red">
    <view class="flex cu-avatar xl round justify-center" style="background-image:url({{userInfo.avatarUrl}});">
      <view class="cu-tag badge {{userInfo.gender%2==0?'cuIcon-female bg-pink':'cuIcon-male bg-blue'}}"></view>
    </view>
    <view class="text-xl flex margin-top-sm justify-center">
      <text>{{userInfo.nickName}}</text>
    </view>
</view>
  <view class="padding flex text-center text-grey bg-white shadow-warp">
    <view class="flex flex-sub flex-direction solid-right">
      <view class="text-xxl text-orange">20</view>
      <view class="margin-top-sm">
        <text class="cuIcon-attentionfill"></text> 总时长</view>
    </view>
    <view class="flex flex-sub flex-direction solid-right">
      <view class="text-xxl text-blue">10</view>
      <view class="margin-top-sm">
        <text class="cuIcon-favorfill"></text> 完成数量</view>
    </view>
    <view class="flex flex-sub flex-direction">
      <view class="text-xxl text-green">5</view>
      <view class="margin-top-sm">
        <text class="cuIcon-fork"></text> 未完成</view>
    </view>
  </view>
<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
    <view class="cu-item arrow">
      <view class="content" bindtap="CopyLink" data-link="https://github.com/weilanwl/ColorUI">
        <text class="cuIcon-formfill text-green"></text>
        <text class="text-grey">历史数据</text>
      </view>
    </view>
    <view class="cu-item arrow">
      <view class="content" bindtap="CopyLink" data-link="https://github.com/weilanwl/ColorUI">
        <text class="cuIcon-settings text-black"></text>
        <text class="text-grey">信息设置</text>
      </view>
    </view>
</view>



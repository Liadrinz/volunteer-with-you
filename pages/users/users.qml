<view class="UCenter-bg bg-gradual-red">
    <view class="flex cu-avatar xl round justify-center" style="background-image:url({{userInfo.qqUserInfo.avatarUrl}});">
      <view class="cu-tag badge {{userInfo.gender%2==0?'cuIcon-female bg-pink':'cuIcon-male bg-blue'}}"></view>
    </view>
    <view class="text-xl flex margin-top-sm justify-center">
      <text>{{userInfo.qqUserInfo.nickName}}</text>
    </view>
</view>
  <view class="padding flex text-center text-grey bg-white shadow-warp">
    <navigator url="/pages/userDetail/userDetail?type=0" class="flex flex-sub flex-direction solid-right">
      <view class="text-xxl text-orange">{{totalTime}}</view>
      <view class="margin-top-sm">
        <text class="cuIcon-attentionfill"></text> 总时长</view>
    </navigator>
    <navigator url="/pages/userDetail/userDetail?type=0" class="flex flex-sub flex-direction solid-right">
      <view class="text-xxl text-blue">{{userInfo.volunteerInfo.postRewards.length}}</view>
      <view class="margin-top-sm">
        <text class="cuIcon-favorfill"></text> 完成数量</view>
    </navigator>
    <navigator url="/pages/userDetail/userDetail?type=1" class="flex flex-sub flex-direction">
      <view class="text-xxl text-green">{{userInfo.volunteerInfo.ongoingPosts.length}}</view>
      <view class="margin-top-sm">
        <text class="cuIcon-fork"></text> 未完成</view>
    </navigator>
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



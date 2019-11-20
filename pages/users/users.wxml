<view class="flex align-center UCenter-bg bg-gradual-red">
    <view class="flex-sub text-center" style="height:100%">
        <view class="cu-capsule round" style="height:25%;">
            <view class="cu-tag text-lg bg-green text-black bg-red">
                信誉度
            </view>
            <view class="cu-tag text-lg line-green text-black">
                {{userInfo.volunteerInfo.credit}}
            </view>
        </view>
        <view class="flex-sub" />
    </view>
    <view class="flex-sub text-center">
        <view class="cu-avatar xl round" style="background-image:url({{userInfo.qqUserInfo.avatarUrl}});">
            <view class="cu-tag badge {{userInfo.gender%2==0?'cuIcon-female bg-pink':'cuIcon-male bg-blue'}}"></view>
        </view>
        <view class="text-xl text-center margin-top-sm">
            <text>{{userInfo.qqUserInfo.nickName}}</text>
        </view>
    </view>
    <view class="flex-sub text-center" />
</view>

<view class="padding flex text-center text-grey bg-white shadow-warp">
    <navigator url="/pages/userDetail/userDetail?type=0" class="flex flex-sub flex-direction solid-right">
        <view class="text-xxl text-orange">{{totalTime}}</view>
        <view class="margin-top-sm"> <text class="cuIcon-attentionfill"></text> 总时长</view>
    </navigator>
    <navigator url="/pages/userDetail/userDetail?type=0" class="flex flex-sub flex-direction solid-right">
        <view class="text-xxl text-blue">{{userInfo.volunteerInfo.postRewards.length}}</view>
        <view class="margin-top-sm"> <text class="cuIcon-favorfill"></text> 完成数量</view>
    </navigator>
    <navigator url="/pages/userDetail/userDetail?type=1" class="flex flex-sub flex-direction">
        <view class="text-xxl text-green">{{userInfo.volunteerInfo.ongoingPosts.length}}</view>
        <view class="margin-top-sm"> <text class="cuIcon-fork"></text> 未完成</view>
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
            <text class="cuIcon-barcode text-green"></text>
            <text class="text-grey">录入时长码</text>
        </view>
    </view>
    <navigator url="/pages/infoSetting/infoSetting" class="cu-item arrow">
        <view class="content">
            <text class="cuIcon-settings text-black"></text>
            <text class="text-grey">信息设置</text>
        </view>
    </navigator>
    <navigator class="cu-item arrow">
        <view class="content">
            <text class="cuIcon-message text-black"></text>
            <text class="text-grey">反馈</text>
        </view>
    </navigator>
</view>

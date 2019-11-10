<view>
    <search onSearch="{{search}}"/>
    <view class="cu-list menu">
        <navigator class="cu-item" wx:for="{{activityList}}" wx:for-index="idx" wx:for-item="act" url="/pages/activityDetail/activityDetail?id={{act.id}}">
                <view class="content padding-tb-sm">
                    <view>
                        <text class="text-xl text-bold padding">{{act.title}}</text>
                    </view>
                    <view class="text-sm">
                        <text class="text-grey padding">报名时间: {{act.beginRegTime}}</text>
                    </view>
                    <view class="text-sm">
                        <text class="text-grey padding">活动时间: {{act.beginTime}}</text>
                    </view>
                    <view class="text-sm">
                        <text class="text-grey padding">活动地点: {{act.location}}</text>
                    </view>
                </view>
                <image style="width: 200rpx; height: 200rpx;" src="/images/vol.jpg" mode="aspectFill"/>
        </navigator>
    </view>
</view>

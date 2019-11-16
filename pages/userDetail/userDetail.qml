<block wx:if="{{type == 0}}">
    <cu-custom CustomBar="height:4rem;" bgColor="bg-gradual-red" isBack="{{true}}">
        <view slot="backText">返回</view><view slot="content">已完成</view>
    </cu-custom>

    <view class="padding-top-lg">
        <view class="cu-card case" wx:for = "{{infos2show}}">
        <view class="cu-item shadow-warp">
            <view class="text-black text-lg padding-xs {{item.state==='已生效'?'bg-white':'bg-gray'}}">
                <view class = "flex justify-between align-center padding-left padding-right">
                    <view class="text-sm">
                        <navigator  hover-class="text-blue" url="/pages/activityDetail/activityDetail?id={{item.activity.id}}" class="text-bold text-df" style="text-decoration-line: underline">活动:{{item.activity.title}} - {{item.post.name}}</navigator>
                        <view class="margin-top-sm">类型:{{item.type}}</view>
                        <view class="margin-top-sm">状态:{{item.state}}</view>
                        <view class="margin-top-sm">时间:{{item.recordTime}}</view>
                    </view>
                    <view>
                        <view class="text-sl text-{{item.rewardTime>=10?'red':item.rewardTime>=5?'blue':green}}">+{{item.rewardTime}}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
    </view> 
</block>


<block wx:if="{{type == 1}}">
  <cu-custom CustomBar="height:4rem;" bgColor="bg-gradual-red" isBack="{{true}}">
    <view slot="backText">返回</view><view slot="content">未完成</view>
  </cu-custom>
  <view>
      <activity id="ongoingActs" actType="work"/>
  </view>
</block>

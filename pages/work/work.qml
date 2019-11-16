<view>
    <scroll-view scroll-x class="fixed bg-white nav" style="margin-top: 4rem;">
        <view class="flex text-center">
            <view class="cu-item flex-sub {{index === tabCur?'text-orange cur':''}}" wx:for="{{tabs.length}}" wx:key bindtap="tabSelect" data-id="{{index}}">
                {{tabs[index]}}
            </view>
        </view>
    </scroll-view>
    <view style="margin-top: 6rem;">
        <publish wx:if="{{tabCur === 0}}" />
        <handleApply wx:if="{{tabCur === 1}}" />
    </view>
</view>

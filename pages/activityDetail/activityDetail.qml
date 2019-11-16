


<cu-custom CustomBar="height:4rem;" bgColor="bg-gradual-red" isBack="{{true}}"><view slot="backText">返回</view><view slot="content">详情</view></cu-custom>

<view class="flex justify-center align-center flex-direction" bindtap="hideModal">
  <view class="margin-xs cu-card case text-bold text-xl">{{"【"+activity.id+"】"+activity.title}}     </view>{{activity.isDone == true?"【已结项】":""}}
    <image class="padding-lg"  style="width:{{autoSize.width}}px;height:{{autoSize.height}}px" src="{{activity.picture?activity.picture:'/images/noimg_opp.jpg'}}" bindload="autoImage"/> 
  <view class="response padding-sm">
    <view class="flex margin-xs">
        <view class="flex-sub text-bold">项目地点</view>
        <view class="flex-twice">{{activity.location}}</view>
    </view>
    <view class="flex margin-xs">
      <view class="flex-sub text-bold">招募日期</view>
      <view class="flex-twice">{{activity.beginRegTime +" 至 "+ activity.endRegTime}}</view>
    </view>
    <view class="flex margin-xs">
      <view class="flex-sub text-bold">项目日期</view>
      <view class="flex-twice">{{activity.beginTime +" 至 "+ activity.endTime}}</view>
    </view>
    <view class="flex margin-xs">
      <view class="flex-sub text-bold">服务时间</view>
      <view class="flex-twice">{{activity.detail}}</view>
    </view>
  </view>
</view> 


<view class="cu-card case" wx:for = "{{posts}}">
  <view class="cu-item shadow">
    <view class="bg-grey text-black text-lg padding-xs flex justify-between align-center">
      <view class="text-df">
      {{"岗位"+ (index+1)+":" + item.name+"   计划招募:"+item.plan+"   已招募:"+item.current}} 
      </view>
      <view wx:if="{{activity.isDone == true}}" class="cu-btn round bg-gray df">
        已结项
      </view>
      <button wx:elif="{{!item.isApplyed}}" class="cu-btn round bg-red df" bindtap="applyPost" data-post="{{item}}">
        我要报名
      </button>
      <button wx:else class="cu-btn round bg-gray df" bindtap="canclePost" data-post="{{item}}">
        取消报名
      </button>
    </view>
    <view class="bg-white padding-sm">
      <view class="text-green">
        岗位ID:
      </view>
      {{item.id}}
      <view class="text-green">
        岗位描述:
      </view>
      {{item.descript}}\n
      <view class="text-green">
        岗位条件:
      </view>
      {{item.condition}}
    </view>
  </view>
</view> 



<view hidden="{{applySuccess}}" class="cu-modal show">
  <view class="cu-dialog">
    <view class="cu-bar bg-white justify-end">
      <view class="content">报名失败</view>
      <view class="action" bindtap="hideModal">
        <text class="cuIcon-close text-red"></text>
      </view>
    </view>
    <view class="padding-xl">
      报名人数到达上限
    </view>
  </view>
</view>

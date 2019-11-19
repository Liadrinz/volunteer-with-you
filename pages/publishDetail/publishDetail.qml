<cu-custom CustomBar="height:4rem;" bgColor="bg-gradual-red" isBack="{{true}}">
    <view slot="backText">返回</view>
    <view slot="content">发布活动</view>
</cu-custom>
<view>
    <form>
        <view class="margin-top">
            <view class="cu-form-group">
                <view class="title">项目地点</view>
                <input data-prop="location" bindinput="handleActChanges"></input>
            </view>
            <view class="cu-form-group">
                <view class="title">开始时间</view>
                <picker data-prop="beginTime" bindchange="handleActChanges" mode="date"></picker>
            </view>
            <view class="cu-form-group">
                <view class="title">结束时间</view>
                <picker data-prop="endTime" bindchange="handleActChanges" mode="date"></picker>
            </view>
            <view class="cu-form-group">
                <view class="title">项目详情</view>
                <textarea data-prop="detail" bindinput="handleActChanges" auto-height="true" maxlength="-1"></textarea>
            </view>
        </view>
        <view wx:for="{{posts}}" wx:for-item="post" wx:for-index="i" class="margin-top">
            <view class="cu-bar bg-white solid-bottom margin-top">
                <view class="action text-xl">
                    <text class="cuIcon-title text-orange"></text>岗位{{i + 1}}
                </view>
                <view class="action">
                    <button class="cu-btn bg-red shadow" data-index="{{i}}" bindtap="deletePost" ><text class="cuIcon-delete"></text>删除</button>
                </view>
            </view>
            <view class="cu-form-group">
                <view class="title">岗位ID</view>
                <input data-index="{{i}}" data-prop="id" value="{{post.id}}" bindinput="handlePostChanges">{{post.id}}</input>
            </view>
            <view class="cu-form-group">
                <view class="title">岗位名称</view>
                <input data-index="{{i}}" data-prop="name" value="{{post.name}}" bindinput="handlePostChanges">{{post.name}}</input>
            </view>
            <view class="cu-form-group">
                <view class="title">岗位条件</view>
                <input data-index="{{i}}" data-prop="condition" value="{{post.condition}}" bindinput="handlePostChanges">{{post.condition}}</input>
            </view>
            <view class="cu-form-group">
                <view class="title">岗位描述</view>
                <textarea data-index="{{i}}" data-prop="description" value="{{post.description}}" bindinput="handlePostChanges" auto-height="true" maxlength="-1">{{post.description}}</textarea>
            </view>
        </view>
        <button class="flex justify-center cu-btn round bg-gradual-green lg margin" bindtap="addPost">
            <view class="text-xl">
                <text class="cuIcon-add"></text>
                添加岗位
            </view>
        </button>
        <button class="flex justify-center cu-btn round bg-gradual-green lg margin" bindtap="publishAct">
            <view class="text-xl">
                确认发布
            </view>
        </button>
    </form>
</view>
<cu-custom bgColor="bg-gradual-pink" isBack="{{true}}">
	<view slot="backText">返回</view>
	<view slot="content">志愿者信息</view>
</cu-custom>
<form bindvalidate="validateCallBack" bindsubmit="formSubmit" bindreset="formReset">
    <view class="cu-bar bg-white solid-bottom margin-top">
        <view class="action">
            <text class="cuIcon-titles text-orange"></text> 个人信息
        </view>
    </view>
	<customInput id="customInput" name="name" maxLength="10" defaultvalue="ok" placeholder="姓名" title="姓名"/>
	<customInput id="customInput" name="tel" maxLength="11" placeholder="输入11位有效手机号" title="手机号码" type="number" validateFunc="phone"/>
	<customInput id="customInput" name='grade' maxLength="10" minLength="10" placeholder="输入10位有效班级号" title="班级" type="number"/>
	<customInput id="customInput" name="schoolid" maxLength="10" minLength="10" placeholder="输入10位有效学号" title="学号" type="number"/>
    <view class="cu-bar bg-white solid-bottom margin-top">
        <view class="action">
            <text class="cuIcon-titles text-orange"></text> 志愿北京信息
        </view>
    </view>
	<customInput id="customInput" name='username' placeholder="输入志愿北京登录用户名" title="用户名"/>
	<customInput id="customInput" name='password' placeholder="输入志愿北京登录密码" title="密码" type="password"/>
    <view class="flex margin-top-xl">
        <button hover-class="bg-orange" class="bg-red basis-df margin-lr" form-type="submit">应用</button>
        <button hover-class="bg-black" class="bg-grey basis-df margin-lr" form-type="reset">重置</button>
    </view>
</form>
const regeneratorRuntime = require("/runtime.js")

var getData = {
    qq: null,
    app: null,
    _privateData: {
        curActivityID: 0,
        curApplyID: 0,
        serverUrl: "http://10.28.205.190:8081/",
        spiderUrl: "http://lego24.cn/spider/",
        staticUrl: "http://10.28.205.190:8888/"
    },
    registe: function(infos, type) {
        qq.showLoading({
            title: "请求中"
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.serverUrl + "",
            data: {
                type: type,
                ...infos,
            },
            success: function(e) {
                if (e.data.code == 0) {
                    getData.app.globalData.userInfo.userType = e.data.userType
                    getData.app.globalData.volunteerInfo = e.data.info
                    resolve()
                } else {
                    reject()
                }
            },
            complete: qq.hideLoading,
        }))
    },
    userLogin: function() {
        qq.showLoading({
            title: "登录中"
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.serverUrl + "/v/login/" + getData.app.globalData.code,
            success: function(e) {
                if (e.data.code == 0) {
                    getData.app.globalData.userInfo.volunteerInfo = e.data.data
                    resolve(e.header.type)
                } else {
                    reject()
                }
            },
            complete: qq.hideLoading,
        }))
    },
    getVolInfo: function() {
        qq.showLoading({
            title: "同步志愿者信息"
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.serverUrl + "v/login/" + getData.app.globalData.code,
            success: function(e) {
                console.log(e)
                getData.app.globalData.userInfo.volunteerInfo = e.data.data
                resolve(e.data.data)
            },
            fail: function() {
                console.log("fail")
            },
            complete: qq.hideLoading
        }))
    },
    getTeamInfo: function() {
        qq.showLoading({
            title: "同步中",
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.serverUrl + "/login/team/",
            data: {
                js_code: getData.app.globalData.code,
            },
            success: function(e) {
                if (e.data.code == 0) {
                    getData.app.globalData.userInfo.volunteerInfo = e.data.data
                    resolve()
                } else
                    reject(e.data.msg)
            },
            fail: function() {
                console.log("fail")
            },
            complete: qq.hideLoading,
        }))
    },
    setTeamInfo: function(teamInfo) {
        qq.showLoading({
            title: "提交中",
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.serverUrl + "login/team/add",
            data: {
                ...teamInfo,
                js_code: getData.app.globalData.code,
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function(e) {
                console.log(e)
                if (e.data.code == 0) {
                    getData.app.globalData.userInfo.volunteerInfo = e.data.data
                    resolve()
                } else
                    reject(e.data.msg)

            },
            fail: function() {
                console.log("fail")
            },
            method: "POST",
            complete: qq.hideLoading,
        }))
    },


    getBVProjectUsers(bvProjectId) {
        qq.showLoading({
            title: "获取志愿者列表",
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.serverUrl + "BV/post/get/w/" + bvProjectId,
            success: function(e) {
                if (e.data.code == 0) {
                    resolve(e.data.data)
                } else
                    reject(e.data.msg)

            },
            fail: function() {
                console.log("fail")
            },
            complete: qq.hideLoading,
        }))

    },
    // 返回下n个活动 
    getActivities: function(startId, n) {
        return new Promise((resolve, reject) => {
            getData.qq.request({
                url: getData._privateData.serverUrl + "project/getRange",
                data: { startId: startId, amount: n },
                success: function(res) {
                    var recvList = res.data.data
                    if (recvList == "null")
                        reject()
                    resolve(recvList, recvList.length == n)
                    console.log(res)
                }
            })
        })
    },
    getFliteActs: function(startId, n, filter) {
        return new Promise((resolve, reject) => {
            getData.qq.request({
                url: getData._privateData.serverUrl + "project/getRange",
                data: { startId: startId, amount: n, ...filter },
                success: function(res) {
                    var recvList = res.data.data
                    if (recvList == "null")
                        reject()
                    resolve(recvList, recvList.length == n)
                    console.log(res)
                }
            })
        })
    },
    // 通过id 返回 对应的活动 
    getActivity: async function(id) {
        qq.showLoading({
            title: "刷新中"
        })
        return new Promise((resolve, reject) => {
            getData.qq.request({
                url: getData._privateData.serverUrl + "project/get/" + id,
                success: function(res) {
                    console.log(res)
                    if (res.data.code == 0) {
                        var act = res.data.data
                        resolve(act)
                    } else {
                        reject()
                    }
                },
                complete: qq.hideLoading
            })
        })
        return getData.activityList[id]
    },
    getActivityPosts: function(activity) {
        var posts = []
        for (let i in activity.posts) { posts.push(getData.postList[activity.posts[i]]) }
        return posts;
    },
    getApply: function(id) {
        return this.applyList[id];
    },
    acceptApply: function(applies) {
        console.log(applies)
        qq.showLoading({
            title: "处理中"
        })
        return new Promise((resolve, reject) => {
            getData.qq.request({
                url: getData._privateData.serverUrl + "post/volun/admit?post_id=" + applies.post_id,
                data: {
                    volunteers: applies.volunteers
                },
                header: {
                    'content-type': "application/json"
                },
                success: function(res) {
                    console.log(res)
                    if (res.data.code == 0) {
                        resolve()
                    } else {
                        reject()
                    }
                },
                method: "POST",
                complete: qq.hideLoading
            })
        })
    },
    getAppliers: function(project_id) {
        qq.showLoading({
            title: "获取数据中"
        })
        return new Promise((resolve, reject) => {
            getData.qq.request({
                url: getData._privateData.serverUrl + "project/applier/get",
                data: {
                    project_id: project_id
                },
                success: function(res) {
                    console.log(res)
                    if (res.data.code == 0) {
                        var act = res.data.data
                        resolve(act)
                    } else {
                        reject()
                    }
                },
                complete: qq.hideLoading
            })
        })
    },
    getReawrdInfo: function(id) {
        return getData.postRewards[id]
    },
    //Post 相关
    getPost: function(id) {
        return getData.postList[id]
    },
    setPost: function(post) {
        getData.postList[post.id] = post
    },
    applyPost: function(post) {
        qq.showLoading({
            title: "申请中",
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.serverUrl + "post/volunteer/add",
            data: {
                volunteer_id: this.app.globalData.userInfo.volunteerInfo.id,
                post_id: post.id
            },
            method: "POST",
            header: { "content-type": "application/x-www-form-urlencoded" },
            success: function(e) {
                if (e.data.code == 0)
                    resolve(e.data.error)
                else
                    reject(e.data.msg)
            },
            fail: function() {
                console.log("fail")
            },
            complete: qq.hideLoading
        }))
    },

    canclePost: function(post) {
        qq.showLoading({
            title: "申请中",
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.serverUrl + "post/volunteer/del/" + this.app.globalData.userInfo.volunteerInfo.id + "/" + post.id,
            success: function(e) {
                if (e.data.code == 0)
                    resolve()
                else
                    reject(e.data.msg)
            },
            fail: function() {
                console.log("fail")
            },
            method: "DELETE",
            complete: qq.hideLoading
        }))
    },
    setVolInfo: function(volInfo) {
        console.log(volInfo)
        qq.showLoading({
            title: "提交中",
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.serverUrl + "update/volunteer",
            data: {
                id: getData.app.globalData.userInfo.volunteerInfo.id,
                ...volInfo,
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function(e) {
                console.log(e)
                if (e.data.code == 0) {
                    getData.app.globalData.userInfo.volunteerInfo = e.data.data
                    resolve()
                } else
                    reject(e.data.msg)

            },
            fail: function() {
                console.log("fail")
            },
            method: "PUT",
            complete: qq.hideLoading,
        }))
    },
    getTimeCodes: function() {
        var result = []
        for (let t in getData.timeCode) {
            if (getData.timeCode[t].volID == getData.volunteerInfo.id) {
                result.push(getData.timeCode[t])
            }
        }
        return result;
    },
    /// Spider
    loginBJVol(loginForm) {
        qq.showLoading({
            title: "登录中",
            mask: true,
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.spiderUrl + "login",
            data: loginForm,
            header: {
                'content-type': "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                if (e.data == "forbidden")
                    reject(false)
                else {
                    resolve(resolve, reject)
                    getData.app.globalData.volToken = e.data.token
                }

            },
            fail: function() {
                console.log("fail")
            },
            complete: qq.hideLoading
        })).then(getData.getBJProjectInfo).then(getData.getBjTimeInfo)
    },
    assignCodes(volids, codes, job_id, time) {
        qq.showLoading({
            title: "分配中",
            mask: true,
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.serverUrl + "timecode/list" + "?job_id=" + job_id + "&time=" + time,
            data: {
                volunteers: volids,
                codes: codes,
            },
            header: {
                'content-type': "application/json"
            },
            method: "POST",
            success: function(e) {
                console.log(e)
                if (e.data.code == 0) {
                    resolve()
                }

            },
            fail: function() {
                console.log("fail")
            },
            complete: qq.hideLoading
        })).then(getData.getBJProjectInfo).then(getData.getBjTimeInfo)

    },
    loginBJTeam(loginForm) {
        qq.showLoading({
            title: "登录中",
            mask: true
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.spiderUrl + "login",
            data: loginForm,
            header: {
                'content-type': "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                if (e.data == "forbidden")
                    reject(false)
                else {
                    resolve(resolve, reject)
                    getData.app.globalData.volToken = e.data.token
                }

            },
            fail: function() {
                console.log("fail")
            },
            complete: qq.hideLoading
        })).then(getData.getBJTeamProjectInfo).then(getData.getBjTeamTimeInfo)
    },
    getBJProjectInfo() {
        qq.showLoading({
            title: "同步项目数据",
            mask: true
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.spiderUrl + "my_projects",
            data: { token: getData.app.globalData.volToken },
            success: function(e) {
                getData.bjvolProjects.push(...e.data)
                resolve()
            },
            fail: function() {
                console.log("fail")
            },
            complete: qq.hideLoading
        }))
    },
    getBjTimeInfo() {
        qq.showLoading({
            title: "同步时长数据",
            mask: true
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.spiderUrl + "my_hour",
            data: { token: getData.app.globalData.volToken },
            success: function(e) {
                getData.bjvolRewards.push(...e.data)
                resolve()
            },
            fail: function() {
                console.log("fail")
            },
            complete: qq.hideLoading
        }))
    },
    getBjTeamTimeInfo() {
        qq.showLoading({
            title: "同步时长数据",
            mask: true
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.spiderUrl + "team_hour",
            data: { token: getData.app.globalData.volToken },
            success: function(e) {
                getData.teamInfo.totalTime = e.data;
                resolve()
            },
            fail: function() {
                console.log("fail")
            },
            complete: qq.hideLoading
        }))
    },
    generateCode(formData) {
        this.qq.showLoading({
            title: "生成中",
            mask: true
        });
        formData['memo'] = '[志愿邮你]';
        return new Promise((resolve, reject) => this.qq.request({
            url: getData._privateData.spiderUrl + "generate_code?token=" + getData.app.globalData.volToken,
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData,
            success: function(e) {
                if (e.data == "forbidden" || e.data === 'bad request')
                    reject(false)
                else {
                    resolve(resolve, reject)
                }
            },
            fail: function(e) {
                console.log('fail')
            },
            complete: this.qq.hideLoading
        }))
    },
    getCodes(opp_id, job_id) {
        return new Promise((resolve, reject) => this.qq.request({
            url: getData._privateData.spiderUrl + "get_code_list",
            data: {
                token: getData.app.globalData.volToken,
                opp_id: opp_id,
                job_id: job_id
            },
            success: function(e) {
                if (e.data == "forbidden")
                    reject(false)
                else {
                    resolve(e.data)
                }
            },
            fail: function(e) {
                console.log('fail')
            }
        }))
    },
    // 确定每一个
    logExistCodes: function(timecodes) {
        for (let i in timecodes) {
            if (getData.timeCode.indexOf(timecodes[i]) != -1) {
                getData._logCodes(timecodes[i])
            }
        }
    },
    /// 模拟 页面中的提交操作
    logInputCodes: function(timecodeInput) {
        qq.showLoading({ title: "提交中" })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.spiderUrl + "use_code",
            method: "POST",
            header: { 'content-type': 'application/json' },
            data: { code: timecodeInput },
            success: function(e) {
                if (e.data == "forbidden") {
                    reject()
                } else {
                    resolve()
                }
            },
            fail: function() {
                console.log("fail")
            },
            complete: qq.hideLoading
        }))

    },
    // 调/get_projects
    getBJTeamProjectInfo: function() {
        qq.showLoading({
            title: "同步项目数据",
            mask: true
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.spiderUrl + "get_projects",
            data: { token: getData.app.globalData.volToken },
            success: function(e) {
                getData.bjteamProjects.splice(0);
                getData.bjteamProjects.push(...e.data)
                resolve()
            },
            fail: function() {
                console.log("fail")
            },
            complete: qq.hideLoading
        }))
    },
    /// 模拟成功提交之后的 操作（更新数据库的数据）
    _logCodes: function(codes) {
        let date = new Date()
        var dateString = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
        if (codes.length != null) {
            for (let i in codes) {
                let id = getData.postRewards.length
                getData.postRewards.push({ id: id, postid: codes[i].postid, type: "时长码录入", state: "已生效", recordTime: dateString, rewardTime: codes[i].rewardTime })
                getData.volunteerInfo.postRewards.push(id)

            }
        } else {
            let id = getData.postRewards.length
            getData.postRewards.push({ id: id, postid: codes.postid, type: "时长码录入", state: "已生效", recordTime: dateString, rewardTime: codes.rewardTime, uid: 0 })
            getData.volunteerInfo.postRewards.push(id)
        }
    },
    getAllLocations: function() {
        return ['北邮幼儿园', '地铁西土城站', '北京国际会议中心'];
    },
    publishEvent: function(opp_form, job_list, team_id) {
        qq.showLoading({
            title: "提交中"
        })
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.serverUrl + "project/add?team_id=" + team_id,
            method: 'POST',
            header: { 'content-type': 'application/json' },
            data: {
                ...opp_form,
                posts: job_list
            },
            success: function(e) {
                if (e.data == "forbidden") {
                    reject();
                } else {
                    resolve();
                }
            },
            fail: function() {
                console.log("fail")
            },
            complete: qq.hideLoading
        }))
    },
    updateEvent: function(opp_form, job_list, team_id) {
        return new Promise((resolve, reject) => qq.request({
            url: getData._privateData.serverUrl + "project/update?team=" + team_id,
            method: 'POST',
            header: { 'content-type': 'application/json' },
            data: {
                ...opp_form,
                team: team_id,
                posts: job_list
            },
            success: function(e) {
                if (e.data == "forbidden") {
                    reject();
                } else {
                    resolve();
                }
            },
            fail: function() {
                console.log("fail")
            },
            complete: qq.hideLoading
        }))
    },
    uploadImage: function(imgUrl) {
        qq.showLoading({
            title: '上传中',
            mask: true
        })
        return new Promise((resolve, reject) => qq.uploadFile({
            url: getData._privateData.serverUrl + "test/file",
            name: 'file',
            filePath: imgUrl,
            success: function(e) {
                let res = JSON.parse(e.data);
                if (res.code != 0) {
                    reject(e);
                } else {
                    resolve(res);
                }
            },
            fail: function() {
                console.log("fail");
            },
            complete: qq.hideLoading
        }))
    },
    //testing datas
    activityList: [
        { id: 0, title: '教小朋友学Python', beginRegTime: '2019-10-01', endRegTime: '2019-10-07', beginTime: '2020-01-15', endTime: '2020-03-01', location: '北邮幼儿园', projectDetail: "2019年10月28日下午3:00至4:00", posts: [0, 1], picture: '/images/u=3615214809,3485655572&fm=11&gp=0.jpg', isDone: true },
        { id: 1, title: '地铁志愿', beginRegTime: '2019-10-01', endRegTime: '2019-10-01', beginTime: '2020-10-03', endTime: '2020-10-03', location: '地铁西土城站', detail: "	2019年11月9日上午9:00至2019年11月9日上午11:00", posts: [2], picture: null, isDone: true },
        { id: 2, title: 'QCon', beginRegTime: '2019-10-01', endRegTime: '2019-11-01', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心', detail: "2019年11月7日至2019年11月8日通过志愿服务服务于2020届毕业生双选会参会企业", posts: [3], picture: null, isDone: false },
        { id: 3, title: 'test1', beginRegTime: '2019-10-01', endRegTime: '2019-11-01', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心', detail: "2019年11月7日至2019年11月8日通过志愿服务服务于2020届毕业生双选会参会企业", posts: [4], picture: null, isDone: false },
        { id: 4, title: 'test1', beginRegTime: '2019-10-01', endRegTime: '2019-11-01', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心', detail: "2019年11月7日至2019年11月8日通过志愿服务服务于2020届毕业生双选会参会企业", posts: [4], picture: null, isDone: false },
        { id: 5, title: 'test1', beginRegTime: '2019-10-01', endRegTime: '2019-11-01', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心', detail: "2019年11月7日至2019年11月8日通过志愿服务服务于2020届毕业生双选会参会企业", posts: [4], picture: null, isDone: false },
        { id: 6, title: 'test1', beginRegTime: '2019-10-01', endRegTime: '2019-11-01', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心', detail: "2019年11月7日至2019年11月8日通过志愿服务服务于2020届毕业生双选会参会企业", posts: [4], picture: null, isDone: false },
        { id: 7, title: 'test1', beginRegTime: '2019-10-01', endRegTime: '2019-11-01', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心', detail: "2019年11月7日至2019年11月8日通过志愿服务服务于2020届毕业生双选会参会企业", posts: [4], picture: null, isDone: false },
        { id: 8, title: 'test1', beginRegTime: '2019-10-01', endRegTime: '2019-11-01', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心', detail: "2019年11月7日至2019年11月8日通过志愿服务服务于2020届毕业生双选会参会企业", posts: [4], picture: null, isDone: false },
        { id: 9, title: 'test1', beginRegTime: '2019-10-01', endRegTime: '2019-11-01', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心', detail: "2019年11月7日至2019年11月8日通过志愿服务服务于2020届毕业生双选会参会企业", posts: [4], picture: null, isDone: false },
        { id: 10, title: 'test1', beginRegTime: '2019-10-01', endRegTime: '2019-11-01', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心', detail: "2019年11月7日至2019年11月8日通过志愿服务服务于2020届毕业生双选会参会企业", posts: [4], picture: null, isDone: false },
        { id: 11, title: 'test1', beginRegTime: '2019-10-01', endRegTime: '2019-11-01', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心', detail: "2019年11月7日至2019年11月8日通过志愿服务服务于2020届毕业生双选会参会企业", posts: [4], picture: null, isDone: false },
        { id: 12, title: 'test1', beginRegTime: '2019-10-01', endRegTime: '2019-11-01', beginTime: '2020-12-15', endTime: '2020-12-19', location: '北京国际会议中心', detail: "2019年11月7日至2019年11月8日通过志愿服务服务于2020届毕业生双选会参会企业", posts: [4], picture: null, isDone: false },
    ],
    postList: [
        { id: 1, postname: "run", postDetail: "跑步", requirement: "并不会python", maxNum: 20, },
        { id: 2, actID: 1, name: "站岗", descript: "站岗帮忙", condition: "有腿", plan: 10, },
        { id: 3, actID: 2, name: "站岗", descript: "跑步", condition: "会机器学习", plan: 20, },
        { id: 4, actID: 3, name: "test1", descript: "跑步", condition: "会机器学习", plan: 20, },
    ],
    applyList: [
        { id: 0, activity: { id: 0, title: "教小朋友学Python" }, applier: { name: "蔡宇昂", buptId: "2017211872", credit: 100, totalLength: 100 }, applyTime: "2019-10-01", comment: "您好，我想参加这个志愿活动" },
        { id: 1, activity: { id: 1, title: "地铁志愿" }, applier: { name: "陈凌云", buptId: "2017211868", credit: 100, totalLength: 100 }, applyTime: "2019-10-01", comment: "您好，我想参加这个志愿活动" },
        { id: 2, activity: { id: 1, title: "地铁志愿" }, applier: { name: "吴志镛", buptId: "2017211869", credit: 100, totalLength: 100 }, applyTime: "2019-10-01", comment: "您好，我想参加这个志愿活动" }
    ],
    postRewards: [
        { id: 0, uid: 0, postid: 0, type: "团体录入", state: "已生效", recordTime: "2019-7-20 19:20:10", rewardTime: 10 },
        { id: 1, uid: 0, postid: 2, type: "团体录入", state: "已生效", recordTime: "2019-7-20 19:20:10", rewardTime: 5 },
    ],
    volunteerInfo: {
        id: 0,
        viableTimeCode: 2,
        name: "陈凌云",
        schoolid: 2017211868,
        grade: 2017211501,
        tel: null,
        qq: null,
        description: null,
        username: null,
        password: null,
        credit: 100, //信誉积分
        timeCodeList: [0, 1],
        projects: [1, 2],

    },
    teamInfo: {
        name: "",
        totalTime: 0,
        activities: {
            doing: []
        }
    },
    timeCode: [
        { code: "12ui3yxc4z56", postid: 3, volID: 0, rewardTime: 5, detail: "test" },
        { code: "12u3ixyc4z65", postid: 4, volID: 0, rewardTime: 4, detail: "test1" },
        { code: "12u3i1111111", postid: 4, volID: 1, rewardTime: 10, detail: "test1" },
    ],
    // 后端数据
    serverprojects: [],

    //
    bjvolProjects: [],
    bjteamProjects: [],
    bjvolRewards: []
}

export default getData;
import config from './config'
import mock from './mock'
import axios from 'axios'

var utils = {
    sendRequest(param) {
        var that = this
        if (!config.DEBUG) {
            that.requestFun(param)
        } else { // 使用mock数据
            var result = mock[param.url]
            if (result) {
                param.callback && param.callback(result)
            } else {
                that.requestFun(param)
            }
        }
    },
    requestFun(param) {
        var that = this
        var flag = false
        // 时间戳生成
        param.data.t = new Date().getTime()
        if (param.method == 'POST') { // post请求数据要转成json字符串
            param.data = JSON.stringify(param.data)
            flag = true
        }
        axios({
            method: param.method,
            url: param.url,
            params: !flag?param.data:{},
            headers: {'sessionKey': that.getUserSession()},
            data: flag?param.data:{},
        }).then(res=>{
            param.callback(res)
        })
    },
    getUserSession() {
        // 测试数据
        return '123456'
    },
    getApi(url) {
        return config.APIS[url]
    }
}

export default utils



//对axios进行二次封装
axios.defaults.baseURL = "http://localhost:8888";
//数据以表单的形式传给服务器
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//数据以表单的形式传给服务器 改变数据格式
axios.defaults.transformRequest = function(data) {
    if (!data) return data;
    let result = '';
    for (let attr in data) {
        if (!data.hasOwnProperty(attr)) break;
        result += `&${attr}=${data[attr]}`;
    }
    return result.substring(1);
};
//配置请求拦截器
axios.interceptors.request.use(config => {
    return config;
});
//配置请求拦截器
axios.interceptors.response.use(response => {
    return response.data;
}, reason => {
    // console.dir(reason);
    if (reason.response) {
        switch (String(reason.response.status)) {
            case "404":
                alert("当前请求地址不存在！")
                break;
            default:
                break;
        }
    }
    return Promise.reject(reason);
});
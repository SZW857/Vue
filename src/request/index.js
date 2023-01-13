// 首先先引入aixos
import axios from 'axios'


// element引入文件

// 创建一个axios 实例
const api = axios.create({
    baseURL: 'http://127.0.0.1:8083', // 基准地址
    timeout: 5000 ,// 超时时间5s
    withCredentials: true, // 异步请求携带cookie
})

// 请求拦截
api.interceptors.request.use(
    (config) => {
    // const token = window.localStorage.getItem('token');
    // // 判断是否存在token，如果存在的话，则每个http header都加上token
    // if (token) {
    //     config.headers.Authorization = 'Bearer ' + token;
    // }
    // 放行
    return config;
}, error => {
        console.log(error)
    return Promise.reject(error)
})
// 响应拦截
/**
 响应拦截也是一样，最基本的可以把返回出来的一些数据做简单处理，
 比如把请求回来的提示信息解构出来，给予提示，这样就不用在每次请求完成后单独去写
 这里用的是element-ui 里面的提示
 **/
api.interceptors.response.use((res) => {
    return res;
}, err => {
    console.log(err);
    // 对于需要授权的请求接口，还未授权则统一去登录页面授权
    // "401" 即未授权，需要请求要求身份验证
    // if (err.response.status == '401') {
    //     Toast.fail('请先登录');
    //     router.push({ path: '/login' });
    // }
    return Promise.reject(err)
})
// 最后导出
export default api;
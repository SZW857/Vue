import axios, {request} from 'axios'
import router from "@/router";

const api = axios.create({
    baseURL: 'http://192.168.43.60:8083', // 基准地址
    timeout: 3000 ,// 超时时间3s
    withCredentials: true, // 异步请求携带cookie
})

// RequestInterceptor
api.interceptors.request.use(
    (config) => {
    // 放行
    return config;
}, error => {
    return Promise.reject(error)
})

// ResponseInterceptor
api.interceptors.response.use((res) => {
    return res;
},  err => {
    if (err.message === 'Network Error') {
        alert("网络请求超时╯﹏╰,服务器连接失败>_<,即将返回首页!!")
        window.localStorage.removeItem("AdminToken")
        window.localStorage.removeItem("VolunteerToken")
        setTimeout(()=>{
            router.push('/').then(() => {
                window.location.reload()
            })
            return Promise.reject(err.message)
        },)
    }
})
export default api;
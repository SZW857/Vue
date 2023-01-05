// 这里是封装好的aioxs
import api from '@/request/index.js'
// 登录
export const postRequest = (tele,code) => {
    return api({
        url: '/sendMessage',
        method: 'POST',
        headers:{
            "Content-Type" : "application/json;charset=utf-8",
        },
        params:{
             tele,
             code
        },

    })
}
export const getRequest = (data) => {
    return api({
        url: '/hello',
        method: 'POST',
        headers:{
            "Content-Type" : "application/json;charset=utf-8",
        },
        data:{

        },
        params:{

        }

    })
}

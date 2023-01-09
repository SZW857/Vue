// 这里是封装好的aioxs
import api from '@/request/index.js'

export const postRequest = (path,param) => {
    return api({
        url: path,
        method: 'POST',
        headers:{
            "Content-Type" : "application/json;charset=utf-8",
        },
        params:param,
        dataType: 'json'
        
    })
}
export const getRequest = (path,params) => {
    return api({
        url: path,
        method: 'GET',
        headers:{
            "Content-Type" : "application/json;charset=utf-8",
        },
        data:{
        },
        params:params

    })
}
export const getRest = (path,param) => {
    return api({
        url: path,
        method: 'GET',
        headers:{
            "Content-Type" : "application/json;charset=utf-8",
        },
        params:param,
        dataType: 'json'

    })
}
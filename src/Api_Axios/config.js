import api from '@/Axios/index.js'

export const postRequest = (path, param) => {
    return api({
        url: path,
        method: 'POST',
        header: {
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

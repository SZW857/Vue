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
<<<<<<< HEAD

       

=======
        
>>>>>>> 4de308e703d7ab56d117e0d43fadf49f549f5e5f
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
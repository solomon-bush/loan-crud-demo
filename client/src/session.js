import {BehaviorSubject} from 'rxjs'

export const authPayload = new BehaviorSubject({auth: false, id: null, role: 'member'})

const storeLocalData = (data) => new Promise((resolve, reject) => {
    Object.entries(data).map((v,i,a) =>{
        localStorage.setItem(`${v[0]}`, v[1])
        if(i === a.length-1){
            resolve()
        }
    })
})
export const login = (data) => {
    storeLocalData(data).then(() =>{
        authPayload.next({auth: true, id: data._id, role: data.role})
    })
}

export const logout = () => {
    localStorage.clear()
    authPayload.next({auth:false, id: null, role: 'member'})
}

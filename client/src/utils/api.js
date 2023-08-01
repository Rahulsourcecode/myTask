import axios from "./Axios"
import { tryCatch } from "./tryCatch"

export const login = tryCatch(user => {
    const res = axios.post("/general/login", user)
    return res

})

export const setRoles = tryCatch(async (role) => {
    const res = await axios.post("/admin/addRoles", role)
    return res
})

export const addUser = tryCatch(async (data) => {
    const res = await axios.post('/admin/addUser', data)
    return res
})

export const getRoles = async () => {
    try {
        const res = await axios.get('/admin/getRoles')
        if (res?.data) {
            return res.data
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message
        console.error('Error ' + errorMessage)
        return
    }

}
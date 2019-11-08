import axios from 'axios'

const _backendUri = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '/'

export const backendUri = _backendUri

export const api = axios.create({
    baseURL: `${_backendUri}/api`
})

api.interceptors.response.use((res) => {
    return res
}, (err) => {
    if (err.response.status === 403) {
        localStorage.removeItem('user')
        window.location.reload()
    } else {
        return err
    }
})

api.interceptors.request.use((config) => {
    if (config.url !== '/login') {
        const token = JSON.parse(localStorage.getItem('user')).token
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (err) => {
    return err
})
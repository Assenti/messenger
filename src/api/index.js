import axios from 'axios'
const _backendUri = 'http://localhost:3001'

export const backendUri = _backendUri

export const api = axios.create({
    baseURL: `${_backendUri}/api`
})

export const setToken = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
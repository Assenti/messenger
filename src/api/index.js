import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3001/api'
})

export const setToken = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
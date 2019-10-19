import io from "socket.io-client"
import { backendUri } from './api'
export const socket = io(backendUri)

if (process.env.NODE_ENV === 'development') {
    socket.on('connect', () => console.log('Connected'))
    socket.on('disconnect', () => console.log('Disconnected'))
}

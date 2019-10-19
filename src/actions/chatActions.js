// import { NEW_MSG } from '../actions/types'
import mockAvatar from '../img/man.png'
import { api, setToken } from '../api'
import { socket } from '../socket'

/** Add a new message into chosen chat
 * @param {string} msg 
 * @param {string} chatId 
 * @param {string} senderId 
 * @param {string} receiverId 
 */
export const addNewMsg = (msg, chatId, senderId, receiverId) => async (dispatch) => {
    let id = parseInt(Math.random() * 1000)

    socket.emit('newMessage', {
        id: id,
        text: msg, 
        sender: 'John Doe',
        createdAt: '2019-10-06 20:05:00', 
        avatar: mockAvatar
    })
}

/** Add a new chat
 * @param {string} participantId user id 
 */
export const addNewChat = (participantId, token) => async (dispatch) => {
    try {
        setToken(token)
        const { data } = await api.get(`/newChat?participant=${participantId}`)
        return data
    } catch (e) {
        console.log(e)
    }
}
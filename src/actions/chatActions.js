import { NEW_MSG, GET_CHATS } from '../actions/types'
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

    socket.on('addedNewMessage', (msgData) => {
        console.log(msgData)

        dispatch({
            type: NEW_MSG,
            payload: msgData
        })
    })

    // socket.on('addedNewMessageBroadcast', (msgData) => {
    //     dispatch({
    //         type: NEW_MSG,
    //         payload: msgData
    //     })
    // })
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


/** Get user chats */
export const getUserChats = () => async (dispatch, getState) => {
    try {
        const { user } = getState().auth
        setToken(user.token)
        const { data } = await api.get(`/chats?id=${user._id}`)
        if (data.status === 'success') {
            dispatch({
                type: GET_CHATS,
                payload: data.result
            })
        } else if (data.status === 'error') {
            return {
                message: data.message
            }
        }
    } catch (e) {
        console.log(e)
        let msg = e.response ? JSON.stringify(e.response.data) : 'Server error'
        return {
            message: msg
        }
    }
}
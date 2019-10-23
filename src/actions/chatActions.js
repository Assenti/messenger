import { NEW_MSG, GET_CHATS, GET_MSGS } from '../actions/types'
import { api, setToken } from '../api'
import { socket } from '../socket'
import { logger } from '../logger'
 
/** Add a new message into chosen chat
 * @param {string} msg 
 * @param {string} chatId 
 * @param {string} senderId 
 * @param {string} receiverId 
 */
export const addNewMsg = (msg, chatId) => async (dispatch, getState) => {
    const { user } = getState().auth

    socket.emit('newMessage', {
        text: msg, 
        senderId: user._id,
        chatId: chatId
    })

    socket.on('addedNewMessage', (msgData) => {
        logger(msgData)

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
export const addNewChat = (participantId) => async (dispatch, getState) => {
    try {
        const { user } = getState().auth
        setToken(user.token)
        const { data } = await api.get(`newChat?participant=${participantId}`)
        logger(data)
        if (data.status === 'success') {
            return {
                message: 'New chat successfully created'
            }
        } else {
            return {
                message: data.message
            }
        }
    } catch (e) {
        logger(e)
        let msg = e.response ? JSON.stringify(e.response.data) : 'Server error'
        return {
            message: msg
        }
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
        logger(e)
        let msg = e.response ? JSON.stringify(e.response.data) : 'Server error'
        return {
            message: msg
        }
    }
}

/** Get chat messages */
export const getChatMsgs = (chatId, page = 1) => async (dispatch, getState) => {
    
    try {
        const { user } = getState().auth
        setToken(user.token)
        const { data } = await api.get(`/messages?chatId=${chatId}&page=${page}`)
        
        logger(data)

        if (data.status === 'success') {
            dispatch({
                type: GET_MSGS,
                payload: data.result
            })
            return {
                messages: data.result.length === 0 ? 'No messages yet' : ''
            }
        } else if (data.status === 'error') {
            return {
                message: data.message
            }
        }
    } catch (e) {
        logger(e)
        let msg = e.response ? JSON.stringify(e.response.data) : 'Server error'
        return {
            message: msg
        }
    }
}
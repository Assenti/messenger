import { NEW_MSG } from '../actions/types'
import mockAvatar from '../img/man.png'
// import { api } from '../api'

/** Add a new message into chosen chat
 * 
 * @param {string} msg 
 * @param {string} chatId 
 * @param {string} senderId 
 * @param {string} receiverId 
 */
export const addNewMsg = (msg, chatId, senderId, receiverId) => async (dispatch) => {
    let id = parseInt(Math.random() * 1000)
    
    dispatch({
        type: NEW_MSG,
        payload: {
            id: id,
            text: msg, 
            sender: 'John Doe',
            createdAt: '2019-10-06 20:05:00', 
            avatar: mockAvatar
        }
    })
}
import { NEW_MSG, GET_CHATS, GET_MSGS, DEL_MSG } from '../actions/types'

const initialState = {
    chats: [],
    chatMessages: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CHATS: 
            return {
                ...state,
                chats: action.payload
            }
        case GET_MSGS: 
            return {
                ...state,
                chatMessages: action.payload
            }
        case NEW_MSG: 
            return {
                ...state,
                chatMessages: [...state.chatMessages, action.payload]
            }
        case DEL_MSG:
            let updatedMsgs = []
            for (const msg of state.chatMessages) {
                if (msg._id !== action.payload) {
                    updatedMsgs.push(msg)
                }
            }
            return {
                ...state,
                chatMessages: updatedMsgs
            }
        default: 
            return state
    }
}
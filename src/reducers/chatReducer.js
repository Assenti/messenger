import { NEW_MSG, GET_CHATS, GET_MSGS } from '../actions/types'

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
            let newMsgsString = JSON.stringify(state.chatMessages)
            let newMsgs = JSON.parse(newMsgsString)
            let isMsgInList = false
            for (const msg of newMsgs) {
                if (msg._id === action.payload._id) {
                    isMsgInList = true
                }
            }
            if (!isMsgInList) newMsgs.unshift(action.payload)
            return {
                ...state,
                chatMessages: newMsgs
            }
        default: 
            return state
    }
}
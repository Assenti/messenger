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
            let newMsgs
            if (state.chatMessages.length === 0) {
                // state.chatMessages.push(action.payload)
                let newMsgsString = JSON.stringify(state.chatMessages)
                newMsgs = JSON.parse(newMsgsString)
                newMsgs.push(action.payload)
            } else {
                // state.chatMessages.unshift(action.payload)
                let newMsgsString = JSON.stringify(state.chatMessages)
                newMsgs = JSON.parse(newMsgsString)
                newMsgs.unshift(action.payload)
            }
            return {
                ...state,
                chatMessages: newMsgs
            }
        default: 
            return state
    }
}
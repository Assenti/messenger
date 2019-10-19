import { NEW_MSG, NEW_CHAT } from '../actions/types'
import mockAvatar from '../img/man.png'

const initialState = {
    chats: [{
        _id: "5da9e41fcb171d2e185dc000",
        createdAt:"2019-10-18T16:11:11.662Z",
        email:"asseke@list.ru",
        phone:"7077110119",
        firstname:"Sarah",
        lastname:"Connor",
        avatar:"",
        status:"Hey there! I am using Messenger"
    }],
    chatMessages: [
        { id: 1, createdAt: '2019-10-06 20:01:00', text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.`, sender: 'John Doe', avatar: mockAvatar },
        { id: 2, createdAt: '2019-10-06 20:03:00', text: `Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`, receiver: 'Anna Smith', avatar: mockAvatar }
    ]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case NEW_CHAT: 
            let newChatsString = JSON.stringify(state.chats)
            let newChats = JSON.parse(newChatsString)
            newChats.unshift(action.payload)
            return {
                ...state,
                chatMessages: newChats
            }
        case NEW_MSG: 
            let newMsgsString = JSON.stringify(state.chatMessages)
            let newMsgs = JSON.parse(newMsgsString)
            newMsgs.unshift(action.payload)
            return {
                ...state,
                chatMessages: newMsgs
            }
        default: 
            return state
    }
}
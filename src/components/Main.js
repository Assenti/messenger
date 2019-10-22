import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Chats from './Chats'
import ActiveChat from './ActiveChat'

const Main = () => {
    const _messages = useSelector(state => state.chat.chatMessages)

    const [activeChat, setActiveChat] = useState({
        name: '',
        messages: []
    })

    const closeChat = () => {
        setActiveChat({
            name: '',
            messages: []
        })
    }

    const assignActiveChat = (chat) => {
        setActiveChat({
            name: `Chat with ${chat.users[1].firstname} ${chat.users[1].lastname}`,
            messages: _messages
        })
    }

    return(
        <div className="flex space-between full-width">
            <Chats activeChat={activeChat} onChooseChat={assignActiveChat}/>
            { activeChat.name ?  
                <ActiveChat chat={activeChat} onClose={closeChat}/> :
                <div className="chats__no-chat-placeholder">
                    <div title="https://giphy.com">
                        <div>Start chat</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Main
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Chats from './Chats'
import ActiveChat from './ActiveChat'

const Main = () => {
    const _messages = useSelector(state => state.chat.chatMessages)

    const [activeChat, setActiveChat] = useState({
        name: `Chat with Sarah Conor`,
        messages: _messages
    })

    const assignActiveChat = (chat) => {
        setActiveChat({
            name: `Chat with ${chat.firstname} ${chat.lastname}`,
            messages: _messages
        })
    }

    return(
        <div className="flex space-between full-width">
            <Chats activeChat={activeChat} onChooseChat={assignActiveChat}/>
            <ActiveChat chat={activeChat}/>
        </div>
    )
}

export default Main
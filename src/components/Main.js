import React, { useState } from 'react'
import Chats from './Chats'
import ActiveChat from './ActiveChat'

const Main = () => {
    const [activeChat, setActiveChat] = useState({
        _id: '',
        one2one: '',
        users: []
    })

    const closeChat = () => {
        setActiveChat({
            _id: '',
            one2one: '',
            users: []
        })
    }

    const assignActiveChat = (chat) => {
        setActiveChat(chat)
    }

    return(
        <div className="flex space-between full-width">
            <Chats activeChat={activeChat} onChooseChat={assignActiveChat}/>
            { activeChat._id ?  
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
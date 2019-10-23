import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ActiveChatInput from './ActiveChatInput'
import { getChatMsgs, addNewMsg } from '../actions/chatActions'
import mockIcon from '../img/man.png'

const ActiveChat = ({ chat, onClose }) => {
    const [page, setPage] = useState(1)
    const messages = useSelector(state => state.chat.chatMessages)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChatMsgs(chat._id, page))

        document.querySelector('#chat-box').onscroll = () => {
            if (this.scrollTop === 0) {
                let _page = page + 1
                setPage(_page)
                dispatch(getChatMsgs(chat._id, page))
            }
        }
    }, [])

    const closeChat = (e) => {
        onClose()
    }

    const chatName = (chat) => {
        return `Chat with ${chat.users[1].firstname} ${chat.users[1].lastname}` 
    }

    const handleNewMessage = (message) => {
        dispatch(addNewMsg(message, chat._id))
    }

    const isUserMessage = (msg) => {
        return user._id === msg.userId
    }

    const handleDateTime = (date) => {
        let dateName = new Date().toLocaleDateString() === new Date(date).toLocaleDateString() ? 
            'Today' : new Date(date).toLocaleDateString()
        return date ? `${dateName} ${new Date(date).toLocaleTimeString()}` : ''
    }

    return (
        <div className="active-chat">
            <div className="active-chat__toolbar">
                <div className="active-chat__toolbar-title">{ chatName(chat) }</div>
                <div className="flex align-center">
                    <div className="icon__btn mr-20">
                        <i className="material-icons">more_vert</i>
                    </div>
                    <div className="icon__btn" 
                        title="Close chat"
                        onClick={closeChat}>
                        <i className="material-icons">close</i>
                    </div>
                </div>
            </div>
            <div className="chat-messages" id="chat-box">
                {messages.map( msg => {
                    return <div key={msg._id} 
                        className={`chat-message__container ${isUserMessage(msg) ? '' : 'receiver'}`}>
                        {isUserMessage(msg) ? <div className="chat-message__date">{handleDateTime(msg.createdAt)}</div> : ''}
                        <div className={`chat-message ${isUserMessage(msg) ? 'sender' : 'receiver'}`}>
                            <div className={isUserMessage(msg) ? 'chat-message__icon sender' : 'chat-message__icon receiver'}>
                                {/* <img src={msg.avatar} alt={msg.avatar}/> */}
                                <img src={mockIcon} alt="avatar"/>
                            </div>
                            <div className="chat-message__text">
                                <div>
                                    <strong>{msg.senderFirstname} {msg.senderLastname}:</strong>
                                </div>
                                <div>{msg.text}</div>
                            </div>
                        </div>
                        {isUserMessage(msg) ? '' : <div className="chat-message__date">{handleDateTime(msg.createdAt)}</div>}
                    </div>
                })}
            </div>
            <ActiveChatInput onNewMessage={handleNewMessage}/>
        </div>
    )
}

export default ActiveChat

import React, { useState } from 'react'
import mockIcon from '../img/man.png'


const MessageField = ({ user, message, onSelectMessage, onResetMessage }) => {
    const [activeMsg, setActiveMsg] = useState('') 

    const isUserMessage = (msg) => {
        return user._id === msg.userId
    }

    const handleDateTime = (date) => {
        let dateName = new Date().toLocaleDateString() === new Date(date).toLocaleDateString() ? 
            'Today' : new Date(date).toLocaleDateString()
        return date ? `${dateName} ${new Date(date).toLocaleTimeString()}` : ''
    }

    const selectMessage = () => {
        setActiveMsg(message)
        onSelectMessage(message)
    }

    const resetMessage = () => {
        setActiveMsg('')
        onResetMessage()
    }

    return (
        <div key={message._id}
            tabIndex="-1"
            onDoubleClick={selectMessage}
            onClick={resetMessage} 
            className={`chat-message__container ${isUserMessage(message) ? '' : 'receiver'}`}>
            {isUserMessage(message) ? <div className="chat-message__date">{handleDateTime(message.createdAt)}</div> : ''}
            <div className={`chat-message ${isUserMessage(message) ? 'sender' : 'receiver'}`}>
                <div className={isUserMessage(message) ? 'chat-message__icon sender' : 'chat-message__icon receiver'}>
                    <img src={mockIcon} alt="avatar"/>
                </div>
                <div className="chat-message__text">
                    {(activeMsg && activeMsg._id === message._id) ? 
                        <i className="material-icons chat-message__select">check_circle</i> : ''}
                    <div>
                        <strong>{message.senderFirstname} {message.senderLastname}:</strong>
                    </div>
                    <div>{message.text}</div>
                </div>
            </div>
            {isUserMessage(message) ? '' : <div className="chat-message__date">{handleDateTime(message.createdAt)}</div>}
        </div>
    )
}

export default MessageField


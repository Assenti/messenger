import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NEW_MSG } from '../actions/types'
import ActiveChatInput from './ActiveChatInput'
import { socket } from '../socket'

const ActiveChat = () => {
    const messages = useSelector(state => state.chat.chatMessages)
    const dispatch = useDispatch()

    socket.on('addedNewMessage', (msgData) => {
        dispatch({
            type: NEW_MSG,
            payload: msgData
        })
    })

    return (
        <div className="active-chat">
            <div className="active-chat__toolbar">
                <div className="active-chat__toolbar-title">Chat One</div>
                <div className="icon__btn">
                        <i className="material-icons">more_vert</i>
                </div>
            </div>
            <div className="chat-messages">
                {messages.map( msg => {
                    return <div key={msg.id} 
                        className={`chat-message__container ${msg.receiver ? 'receiver': ''}`}>
                        {msg.sender ? <div className="chat-message__date">{msg.createdAt}</div> : ''}
                        <div className={`chat-message ${msg.sender ? 'sender' : 'receiver'}`}>
                            <div className={msg.sender ? 'chat-message__icon sender' : 'chat-message__icon receiver'}>
                                <img src={msg.avatar} alt={msg.avatar}/>
                            </div>
                            <div className="chat-message__text">
                                <div>
                                    <strong>{ msg.receiver ? msg.receiver : msg.sender }:</strong>
                                </div>
                                <div>{msg.text}</div>
                            </div>
                        </div>
                        {msg.receiver ? <div className="chat-message__date">{msg.createdAt}</div> : ''}
                    </div>
                })}
            </div>
            <ActiveChatInput/>
        </div>
    )
}

export default ActiveChat

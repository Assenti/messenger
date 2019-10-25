import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getChatMsgs, addNewMsg, deleteMessage } from '../actions/chatActions'
import { socket } from '../socket'
import { GET_MSGS, NEW_MSG } from '../actions/types'
import { logger } from '../logger'

import ActiveChatInput from './ActiveChatInput'
import MessageField from './MessageField'
import Snackbar from './Snackbar'

const ActiveChat = ({ chat, onClose }) => {
    const [page, setPage] = useState(1)
    const [activeMsg, setActiveMsg] = useState('')
    const [message, setMessage] = useState('')
    const [messageStatus, setMessageStatus] = useState('')
    const messages = useSelector(state => state.chat.chatMessages)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    useEffect(() => {
        socket.emit('chatEntered', chat._id)

        socket.on('chatMessages', messages => {
            dispatch({
                type: GET_MSGS,
                payload: messages
            })
        })

        socket.on('addedNewMessage', (msgData) => {
            logger(msgData)
            dispatch({
                type: NEW_MSG,
                payload: msgData
            })
        })
    
        document.querySelector('#chat-box').onscroll = function () {
            if (this.scrollTop === 0) {
                let _page = page + 1
                setPage(_page)
                dispatch(getChatMsgs(chat._id, page))
            }
        }

        return () => {
            socket.off('chatMessages')
            socket.off('addedNewMessage')
            socket.off('addedNewMessageBroadcast')
        }
    }, [])

    const closeChat = (e) => {
        onClose()
    }

    const chatName = (chat) => {
        for (const _user of chat.users) {
            if (_user._id !== user._id) {
                return `Chat with ${_user.firstname} ${_user.lastname}`
            }
        }
    }

    const selectMessage = (message) => {
        if (message) setActiveMsg(message)
    }

    const handleNewMessage = (message) => {
        dispatch(addNewMsg(message, chat._id))
    }

    const _deleteMessage = async () => {
        const result = await dispatch(deleteMessage(chat._id, activeMsg._id))
        if (result && result.message) {
            console.log('snackbar')
            setMessage(result.message)
            setMessageStatus('error')
        }
    }

    const deleteSnackbar = () => {
        console.log('clicked')
        setMessage('')
        setMessageStatus('')
    }

    return (
        <div className="active-chat">
            <div className="active-chat__toolbar">
                <div className="active-chat__toolbar-title">{ chatName(chat) }</div>
                <div className="flex align-center">
                    {activeMsg ? <div className="icon__btn mr-20"
                                    onClick={_deleteMessage}>
                                    <i className="material-icons">delete</i>
                                </div> : ''}
                    <div className="icon__btn" 
                        title="Close chat"
                        onClick={closeChat}>
                        <i className="material-icons">close</i>
                    </div>
                </div>
            </div>
            <div className="chat-messages" id="chat-box">
                {messages.map( msg => {
                    return <MessageField
                        onSelectMessage={selectMessage}
                        onResetMessage={() => setActiveMsg('')} 
                        key={msg._id} 
                        user={user}
                        message={msg} />
                })}
            </div>

            <ActiveChatInput onNewMessage={handleNewMessage}/>

            {message ? <Snackbar 
                onClose={deleteSnackbar} 
                message={message} 
                type={messageStatus}/> : ''}
        </div>
    )
}

export default ActiveChat

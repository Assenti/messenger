import React from 'react'
import mockIcon from '../img/man.png'

const ChatItem = ({ listTitle, items }) => {
    return(
        <div>
            {listTitle ? <div className="chats__toolbar-subtitle">{listTitle}:</div> : ''}
            <div>
                {items.map((user, index) => {
                    return <div className="chats__chat" key={index}>
                        <div className="chats__chat-item">
                            <div className="flex">
                                <img className="chats__chat-icon" src={mockIcon} alt="avatar"/>
                                <div>{user.firstname} {user.lastname}</div>
                            </div>
                            <div className="chats__chat-arrow">
                                <i className="material-icons">chevron_right</i>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default ChatItem
import React, { useState } from 'react'
import mockIcon from '../img/man.png'

const ChatItem = ({ activeChat, listTitle, items, onItemClick }) => {
    const [search, setSearch] = useState('')

    /** Something like computed property in Vue */
    const filteredItems = (items) => {
        if (search) {
            return items.filter(user => {
                return user.firstname.toLowerCase().includes(search.toLowerCase()) ||
                    user.lastname.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase()) ||
                    user.phone.toLowerCase().includes(search.toLowerCase())
            })
        } else {
            return items
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
            setSearch('')
        }
    }

    const handleClick = (user) => {
        onItemClick(user)
    }

    return(
        <div>
            {listTitle ? <div className="chats__toolbar-subtitle">{listTitle}:</div> : ''}
            {listTitle === 'Active chats' ? 
                <div className="chats__new-chat-field-v">
                    <input placeholder="Search chat"
                        value={search}
                        onKeyDown={handleKeyDown}
                        onChange={e => setSearch(e.target.value)}/>
                </div> : ''}
            <div>
                {filteredItems(items).map((user, index) => {
                    console.log(activeChat)
                    return <div className={activeChat.name.includes(user.firstname) ? 'chats__chat chosen' : 'chats__chat'} 
                        key={index} onClick={(e) => handleClick(user)}>
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
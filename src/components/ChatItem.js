import React, { useState } from 'react'
import mockIcon from '../img/man.png'
import { useDispatch } from 'react-redux'
import { addNewChat } from '../actions/chatActions'

const ChatItem = ({ activeChat, listTitle, items, onItemClick }) => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

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

    const createNewChat = async (user) => {
        dispatch(addNewChat(user._id))
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
            setSearch('')
        }
    }

    const handleClick = (user) => {
        if (listTitle === 'Possible users') {
            createNewChat(user)
        } else if (listTitle === 'Active chats') {
            onItemClick(user)
        }
    }

    const isActiveChat = (chat) => {
        return chat._id === activeChat._id
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
                    return <div className={isActiveChat(user) ? 'chats__chat chosen' : 'chats__chat'} 
                        key={index} onClick={(e) => handleClick(user)}>
                        <div className="chats__chat-item">
                            <div className="flex">
                                <img className="chats__chat-icon" src={mockIcon} alt="avatar"/>
                                {listTitle === 'Active chats' ? 
                                    <div className="flex align-center">{user.users[1].firstname} {user.users[1].lastname}</div> :
                                    <div className="flex align-center">{user.firstname} {user.lastname}</div>
                                }
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
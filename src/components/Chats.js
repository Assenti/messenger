import React, { useState } from 'react'
import { api } from '../api'
import { useSelector } from 'react-redux'
import ChatItem from './ChatItem'

const Chats = ({ activeChat, onChooseChat }) => {
    const [search, setSearch] = useState('')
    const [searchedUsers, setSearchedUsers] = useState([])

    const searchInput = React.createRef()
    const chats = useSelector(state => state.chat.chats)

    const toggleSearchField = (e) => {
        if (e) e.preventDefault()
        let field = document.querySelector('#search-field')
        field.style.display = field.style.display !== 'flex' ? 'flex' : 'none'
        if (field.style.display === 'flex') searchInput.current.focus()
        if (field.style.display !== 'flex') setSearchedUsers([])
    }
    
    const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
            if (search) {
                setSearch('')
            } else if (!search) {
                searchInput.current.blur()
                toggleSearchField()
            }
        }
    }

    const handleBlur = (e) => {
        if (!search) toggleSearchField()
    }

    const searchContact = (ev) => {
        setSearch(ev.target.value)
        setTimeout(() => searchUser(), 700)
    }

    const searchUser = async () => {
        if (search) {
            try {
                const { data } = await api.get(`/searchContacts?query=${search}`)
                if (data.status === 'success') {
                    setSearchedUsers(data.result)
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    const openChat = (user) => {
        onChooseChat(user)
    }

    return (
      <div className="chats">
        <div className="chats__toolbar">
            <div className="flex justify-end">
                <button className="btn primary"
                onClick={toggleSearchField}>new chat</button>
            </div>
            
            <div className="chats__new-chat-field" id="search-field">
                <input placeholder="Search person"
                    ref={searchInput}
                    value={search}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onChange={searchContact}/>
            </div>
        </div>
        <div className="chats__body">
            {searchedUsers.length === 0 ? <ChatItem
                activeChat={activeChat}
                onItemClick={openChat} 
                listTitle="Active chats" 
                items={chats} /> : ''}
            <ChatItem onItemClick={openChat}
                activeChat={activeChat}
                listTitle={searchedUsers.length > 0 ? 'Possible users' : ''} 
                items={searchedUsers} />
        </div>
      </div>
    )
}

export default Chats

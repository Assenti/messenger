import React, { useState } from 'react'
import { api, setToken } from '../api'
import { useSelector } from 'react-redux'
import ChatItem from './ChatItem'

const Chats = () => {
    const [search, setSearch] = useState('')
    const [searchedUsers, setSearchedUsers] = useState([])
    const searchInput = React.createRef()
    const token = useSelector(state => state.auth.user.token)
    const chats = useSelector(state => state.chat.chats)

    /** Something like computed property in Vue */
    // const filteredChats = (chats) => {
    //     return chats.filter(chat => {
    //         return chat.firstname.toLowerCase().includes(search.toLowerCase()) ||
    //             chat.lastname.toLowerCase().includes(search.toLowerCase()) ||
    //             chat.email.toLowerCase().includes(search.toLowerCase()) ||
    //             chat.phone.toLowerCase().includes(search.toLowerCase())
    //     })
    // }

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

    async function searchUser() {
        if (search) {
            try {
                setToken(token)
                const { data } = await api.get(`/searchContacts?query=${search}`)
                if (data.status === 'success') {
                    setSearchedUsers(data.result)
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
      <div className="chats">
        <div className="chats__toolbar">
            <div></div>
            <button className="btn primary"
                onClick={toggleSearchField}>new chat</button>
        </div>
        <div className="chats__body">
            <div className="chats__new-chat-field" id="search-field">
                <input placeholder="Search person"
                    ref={searchInput}
                    value={search}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onChange={searchContact}/>
            </div>
            {searchedUsers.length === 0 ? <ChatItem listTitle="Active chats" items={chats} /> : ''}
            <ChatItem listTitle={searchedUsers.length > 0 ? 'Possible users' : ''} items={searchedUsers} />
        </div>
      </div>
    )
}

export default Chats

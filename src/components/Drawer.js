import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { signOut } from '../actions/authActions'
import avatar from '../img/person.png'
import Account from './Account'
import Author from './Author'

const Drawer = ({ onDrawerClose, onInviteFriend }) => {
    const [account, setAccount] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const userFirstname = useSelector(state => state.auth.user.firstname)
    const userLastname = useSelector(state => state.auth.user.lastname)

    const logout = () => {
        closeDrawer(null, true)
        dispatch(signOut())
        setTimeout(() => {
            history.push('/auth')
        }, 100)
    }

    const closeDrawer = (e, isLink) => {
        if (!isLink) {
            e.preventDefault()
            if (e.target === e.currentTarget) {
                onDrawerClose()
            }
        } else {
            onDrawerClose()
        }
    }

    const inviteFriend = () => {
        onInviteFriend()
    }

    const toggleAccount = () => {
        if (account) {
            setAccount(false)
        } else {
            setAccount(true)
        }
    }

    const username = `${userFirstname} ${userLastname}`
    const links = [
        { title: 'Account', icon: 'account_circle', path: '/account', func: toggleAccount },
        { title: 'Invite friend', icon: 'person_add', path: '/', func: inviteFriend },
        { title: 'Logout', icon: 'exit_to_app', path: '/auth', func: logout }
    ]

    return (
      <div className="drawer__container" onClick={closeDrawer}>
            <div className="drawer animated slideInRight faster">
                { account ? <Account onClose={toggleAccount} username={username}/> :
                    <div className="drawer__content">
                        <div className="drawer__title">
                            <div>
                                <img src={avatar} 
                                    alt="avatar" 
                                    title="Author: Flaticon https://www.flaticon.com/authors/monkik"/>
                            </div>
                            <span>{username}</span>
                        </div>
                        <div className="drawer__list">
                            {links.map((link, index) => {
                                return <Link className="drawer__list-item"
                                    key={index}
                                    to={link.path} 
                                    onClick={link.func}>
                                    <i className="material-icons">{link.icon}</i>
                                    {link.title}
                                </Link>
                            })}
                        </div>
                        <Author />
                    </div>
                }
            </div>
      </div>
    )
}

export default Drawer

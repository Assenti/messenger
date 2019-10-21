import React from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { signOut } from '../actions/authActions'
import avatar from '../img/person.png'

const Drawer = ({ onDrawerClose, onInviteFriend }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userFirstname = useSelector(state => state.auth.user.firstname)
    const userLastname = useSelector(state => state.auth.user.lastname)
    const link = 'https://github.com/Assenti'
    

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

    const username = `${userFirstname} ${userLastname}`
    const links = [
        { title: 'Main', icon: 'home', path: '/', func: closeDrawer },
        { title: 'Account', icon: 'account_circle', path: '/account', func: closeDrawer },
        { title: 'Invite friend', icon: 'person_add', path: '/', func: inviteFriend },
        { title: 'Logout', icon: 'exit_to_app', path: '/auth', func: logout }
    ]

    return (
      <div className="drawer__container" onClick={closeDrawer}>
            <div className="drawer animated slideInRight faster">
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
                <div className="drawer__author-info" title="Visit my Github Page">
                    <a href={link}
                        onClick={e => {
                            e.preventDefault()
                            window.open(link, '_blank')
                        }}>
                        <small>by</small> @AssetSultanov
                    </a>
                </div>
            </div>
      </div>
    )
}

export default Drawer

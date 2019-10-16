import React from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { signOut } from '../actions/authActions'

const Drawer = ({ onDrawerClose }) => {
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

    const username = `${userFirstname} ${userLastname}`
    const links = [
        { title: 'Main', icon: 'home', path: '/', func: closeDrawer },
        { title: 'Account', icon: 'account_circle', path: '/account', func: closeDrawer },
        { title: 'Logout', icon: 'exit_to_app', path: '/auth', func: logout }
    ]

    return (
      <div className="drawer__container" onClick={closeDrawer}>
          <div className="drawer">
            <div className="drawer__title">
                <i className="material-icons">account_circle</i>
                {username}
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
        </div>
      </div>
    )
}

export default Drawer

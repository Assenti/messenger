import React from 'react'
import { Link } from "react-router-dom"

const Drawer = ({ onDrawerClose }) => {
    const logout = () => {
        closeDrawer(null, true)
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

    const username = 'Asset Sultanov'
    const links = [
        { title: 'Main', icon: 'home', path: '/', func: closeDrawer(null, true) },
        { title: 'Account', icon: 'account_circle', path: '/account', func: closeDrawer(null, true) },
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
                {links.map(link => {
                    return <Link className="drawer__list-item"
                            onClick={link.func} 
                            to={link.path}>
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

import React, { useState } from 'react'
import InviteFriend from './InviteFriend'
import Drawer from './Drawer'

const AppHeader = () => {
    const [menu, setMenu] = useState(false)
    const [invitieFriendModal, setInviteFriendModal] = useState(false)

    const toggleMenu = () => {
        menu ? setMenu(false) : setMenu(true)
    }

    const inviteFriend = () => {
        setMenu(false)
        setInviteFriendModal(true)
    }

    return (
        <div className="app-header">
            <div className="app-header__title">Messenger</div>
            <div className="app-header__controls">
                <div className="icon__btn" onClick={toggleMenu}>
                    <i className="material-icons">menu</i>
                </div>
            </div>
            {menu ? <Drawer onDrawerClose={toggleMenu} onInviteFriend={inviteFriend}/> : ''}
            {invitieFriendModal ? <InviteFriend onCloseModal={() => setInviteFriendModal(false)}/> : ''}
        </div>
    )
}

export default AppHeader

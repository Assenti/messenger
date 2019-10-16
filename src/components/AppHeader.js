import React, { useState } from 'react'
import Drawer from './Drawer'

const AppHeader = () => {
    const [menu, setMenu] = useState(false)

    const toggleMenu = () => {
        menu ? setMenu(false) : setMenu(true)
    }

    return (
        <div className="app-header">
            <div className="app-header__title">Messenger</div>
            <div className="app-header__controls">
                <div className="icon__btn" onClick={toggleMenu}>
                    <i className="material-icons">menu</i>
                </div>
            </div>
            {menu ? <Drawer onDrawerClose={toggleMenu}/> : ''}
        </div>
    )
}

export default AppHeader

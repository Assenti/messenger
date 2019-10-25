import React from 'react'
// import { CSSTransition } from 'react-transition-group'

const Snackbar = ({ message, type, onClose }) => {
    return (
        // <CSSTransition  
        //     in={message ? true : false}
        //     timeout={300}
        //     classNames="animated slideInUp"
        //     unmountOnExit>
            <div className={type ? `snackbar ${type}` : 'snackbar info'}
                onClick={() => onClose()}>
                <div>{message}</div>
            </div>
        // </CSSTransition>
    )
}

export default Snackbar

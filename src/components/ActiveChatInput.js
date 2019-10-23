import React, { useState } from 'react'

const ActiveChatInput = ({ onNewMessage }) => {
    const [message, setMessage] = useState('')

    const handleInput = (e) => {
        e.preventDefault()
        onNewMessage(message)
        setMessage('')
    }

    return (
        <form className="active-chat__input" 
            onSubmit={handleInput}>
            <input value={message}
                placeholder="Type your message"
                onChange={e => setMessage(e.target.value)}/>
            <button className={!message ? 'btn primary disabled-btn' : 'btn primary'}
                type="submit"
                disabled={!message}>send</button>
        </form>
    )
}

export default ActiveChatInput

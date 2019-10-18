import React, { useState } from 'react'

const ActiveChatInput = ({ onMessageInput }) => {
    const [message, setMessage] = useState('')

    const handleInput = (e) => {
        e.preventDefault()
        onMessageInput(message)
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
                disabled={!!message} 
                onClick={handleInput}>send</button>
        </form>
    )
}

export default ActiveChatInput

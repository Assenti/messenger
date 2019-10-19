import React, { useState } from 'react'
import { addNewMsg } from '../actions/chatActions'
import { useDispatch } from 'react-redux'

const ActiveChatInput = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const handleInput = (e) => {
        e.preventDefault()
        dispatch(addNewMsg(message))
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
                disabled={!message} 
                onClick={handleInput}>send</button>
        </form>
    )
}

export default ActiveChatInput

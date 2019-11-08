import React, { useState, useEffect } from 'react'
import { api } from '../api'
import Alert from './Alert'

const InviteFriend = ({ onCloseModal }) => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [messageStatus, setMessageStatus] = useState('')
    const emailField = React.createRef()

    const closeModal = (e) => {
        if (e.target === e.currentTarget) {
            onCloseModal()
        }
    }

    useEffect(() => {
        emailField.current.focus()
    })

    const sendInvitation = async (ev) => {
        ev.preventDefault()
        
        if (email) {
            try {
                const { data } = await api.get(`/inviteFriend?email=${email}`)
                if (data.status === 'success') {
                    setMessage('Invitation was successfully sent')
                    setMessageStatus(data.status)
                } else {
                    setMessage(data.message)
                    setMessageStatus(data.status)
                }
            } catch (e) {
                console.log(e)
                setMessage('Server error has occurred')
                setMessageStatus('error')
            }
        }
    }

    const deleteAlert = () => {
        setMessage('')
        setMessageStatus('')
    }

    return(
        <div className="modal__container" onClick={closeModal}>
            <div className="modal animated pulse faster">
                <div className="modal__title">
                    Invite Friend
                </div>
                <div className="modal__body">
                    <form onSubmit={sendInvitation}>
                        <div className="form-field">
                            <div className="form-field__icon">
                                <i className="material-icons">email</i>
                            </div>
                            <input ref={emailField} 
                                placeholder="Email"
                                value={email}
                                type="email"
                                required
                                onChange={e => setEmail(e.target.value)}/>
                        </div>

                        {message ? <Alert message={message}
                            onDeleteAlert={deleteAlert} 
                            messageStatus={messageStatus}/> : <br/>}

                        <div className="flex justify-end">
                            <button type="submit"
                                className={!email ? 'btn primary disabled-btn' : 'btn primary'}>Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InviteFriend
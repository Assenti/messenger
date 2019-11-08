import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import avatar from '../img/person.png'
import { api } from '../api'
import { logger } from '../logger'
import Alert from './Alert'

const Account = ({ onClose }) => {
    const user = useSelector(state => state.auth.user)
    const [status, setStatus] = useState(user.status)
    const [statusChange, setStatusChange] = useState(false)
    const [message, setMessage] = useState('')
    const [messageStatus, setMessageStatus] = useState('')
    const statusField = React.createRef()

    const phoneMask = (phone) => {
        return `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8, 10)}`
    }

    const userData = [
        { title: 'First name', value: user.firstname },
        { title: 'Last name', value: user.lastname },
        { title: 'Email', value: user.email },
        { title: 'Phone', value: phoneMask(user.phone) }
    ]

    const toggleStatusChange = (e) => {
        e.preventDefault()
        if (statusChange) {
            setStatusChange(false)
        } else {
            setStatusChange(true)
            // statusField.current.focus()
        }
    }

    const updateStatus = async (e) => {
        e.preventDefault()
        try {
            const body = {
                status: status
            }
            const { data } = await api.post('/changeStatus', body)
            if (data.status === 'success') {
                setStatus(data.result)
                let _user = JSON.parse(localStorage.getItem('user'))
                _user.status = data.result
                localStorage.setItem('user', JSON.stringify(_user))
                setMessage('Status successfully changed')
                setMessageStatus('success')
                setStatusChange(false)
            } else if (data.status === 'error') {
                setMessage(data.message)
                setMessageStatus('error')
            }
        } catch (e) {
            logger(e)
            setMessage('Server error')
            setMessageStatus('error')
        }
    }

    const deleteAlert = () => {
        setMessage('')
        setMessageStatus('')
    }

    return (
        <div className="account animated slideInRight faster">
            <div className="flex justify-end pa-10">
                <button className="btn secondary" onClick={() => onClose()}>Close</button>
            </div>
            <div className="account__content">
                <div className="account__avatar">
                    <img src={avatar} 
                        alt="avatar" 
                        title="Author: Flaticon https://www.flaticon.com/authors/monkik"/>
                </div>
                <div className="account__status-container">
                    {statusChange ?
                        <div className="account__status-field">
                            <textarea ref={statusField} 
                                value={status} 
                                onChange={e => setStatus(e.target.value)}/>
                            <div className="flex justify-end px-20">
                                <button className="btn secondary mr-5"
                                    onClick={toggleStatusChange}>Cancel</button>
                                <button className="btn primary ml-5"
                                    onClick={updateStatus}>Save</button>
                            </div>
                        </div> : 
                        <div className="account__status">
                            {status}
                            <div className="icon__btn small ml-5" onClick={toggleStatusChange}>
                                <i className="material-icons">edit</i>
                            </div>
                        </div>}
                </div>
                {message ? <Alert className="full-width"
                        message={message}
                        onDeleteAlert={deleteAlert} 
                        messageStatus={messageStatus}/> : ''}
                <div className="account__details">{userData.map((item, index) => {
                    return (
                        <div key={index}>
                            <small>{item.title}:</small>
                            <strong>{item.value}</strong>
                        </div>
                        )
                    })
                    }
                </div>
            </div>
            
        </div>
    )
}

export default Account
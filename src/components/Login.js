import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { signIn } from '../actions/authActions'

/** Components */
import Alert from './Alert'

const Login = () => {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [messageStatus, setMessageStatus] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const deleteAlert = () => {
        setMessage('')
        setMessageStatus('')
    }

    const _signIn = async (e) => {
        e.preventDefault()
        if ((email || phone) && password) {
            const res = await dispatch(signIn(email, phone, password))
            if (res.messageStatus === 'error') {
                setMessage(res.message)
                setMessageStatus(res.messageStatus)
            } else if (res.messageStatus === 'success') {
                history.push('/')
            }
        } else {
            setMessage('Input authentication credentials')
            setMessageStatus('error')
        }
    }

    return (
      <div className="register">
          <form className="form" onSubmit={_signIn}>

            <div className={!!phone ? 'form-field disabled' : 'form-field'}>
                <div className="form-field__icon">
                    <i className="material-icons">email</i>
                </div>
                <input placeholder="Email"
                    disabled={!!phone}
                    value={email}
                    type="email"
                    onChange={e => setEmail(e.target.value)}/>
            </div>
            
            <div className={!!email ? 'form-field disabled' : 'form-field'}>
                <div className="form-field__icon">
                    <i className="material-icons">smartphone</i>
                </div>
                <input placeholder="Phone"
                    disabled={!!email}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}/>
            </div>

            <div className="form-field">
                <div className="form-field__icon">
                    <i className="material-icons">lock</i>
                </div>
                <input placeholder="Password" 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
            </div>
            <br/>

            {message ? <Alert message={message}
                    onDeleteAlert={deleteAlert} 
                    messageStatus={messageStatus}/> : ''}

            <div className="flex align-center justify-end">
                <button className="btn primary" type="submit">Log in</button>
            </div>

          </form>
      </div>
    )
}

export default Login


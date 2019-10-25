import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { signIn } from '../actions/authActions'
import InputMask from 'react-input-mask'
import Alert from './Alert'
import Preloader from './Preloader'
import Author from './Author'

const Login = () => {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [messageStatus, setMessageStatus] = useState('')
    const [loading, setLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const deleteAlert = () => {
        setMessage('')
        setMessageStatus('')
    }

    const _signIn = async (e) => {
        e.preventDefault()
        if ((email || phone) && password) {
            setLoading(true)
            let _phone = phone.replace(/['' ',(,)]/g, '').substr(2, 12)
            const res = await dispatch(signIn(email, _phone, password, rememberMe))

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

    const toggleRememberMe = () => {
        if (rememberMe) {
            setRememberMe(false)
        } else {
            setRememberMe(true)
        }
    }

    return (
        <div className="register">
            <form className="form" onSubmit={_signIn}>
                {loading ? <Preloader/> : ''}
                
                <div className={!!phone ? 'form-field disabled' : 'form-field'}>
                    <div className="form-field__icon">
                        <i className="material-icons">email</i>
                    </div>
                    <input type="email" 
                        required
                        placeholder="Email"
                        disabled={!!phone}
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                </div>

                <div className={!!email ? 'form-field disabled' : 'form-field'}>
                    <div className="form-field__icon">
                        <i className="material-icons">smartphone</i>
                    </div>
                    <InputMask type="tel"
                        value={phone}
                        required
                        mask="+7\ (999) 999 99 99"
                        placeholder="Phone"
                        disabled={!!email}
                        onChange={e => setPhone(e.target.value)}/>
                </div>

                <div className="form-field">
                    <div className="form-field__icon">
                        <i className="material-icons">lock</i>
                    </div>
                    <input placeholder="Password" 
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </div>
                
                {message ? <Alert message={message}
                        onDeleteAlert={deleteAlert} 
                        messageStatus={messageStatus}/> : <br/>}

                <div className="flex align-center space-between">
                    <label className="checkbox">Remember me
                        <input type="checkbox" 
                            checked={rememberMe}
                            onChange={() => toggleRememberMe()}/>
                        <span></span>
                    </label>
                    <button className="btn primary" type="submit">Log in</button>
                </div>
            </form>

            <Author/>
      </div>
    )
}

export default Login


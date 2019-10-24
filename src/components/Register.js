import React, { useState } from 'react'
import Alert from './Alert'
import Preloader from './Preloader'
import InputMask from 'react-input-mask'
import { api } from '../api'
import Author from './Author'

const Register = ({ onRegister }) => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [messageStatus, setMessageStatus] = useState('')
    const [loading, setLoading] = useState(false)

    const register = async (e) => {
        e.preventDefault()
        if (!!firstname && 
            !!lastname &&
            !!email &&
            !!phone &&
            !!password
            ) {
            try {
                setLoading(true)
                let _phone = phone.replace(/['' ',(,)]/g, '').substr(2, 12)
                const { data } = await api.post('/register', {
                    firstname,
                    lastname,
                    email,
                    _phone,
                    password
                })
                
                if (data.status === 'success') {
                    setMessage('Congrats! You have been registered!')
                    setMessageStatus('success')

                    setTimeout(() => {
                        onRegister()
                        setMessage('')
                        setMessageStatus('')
                    }, 1000)
                } else {
                    setMessage(data.message)
                    setMessageStatus(data.status)
                }
            } catch (e) {
                console.log(e)
                setMessage('Server error')
                setMessageStatus('error')
            } finally {
                setLoading(false)
            }
        } else {
            setMessage('Input all required fields')
            setMessageStatus('error')
        }
    }

    let alertMessage = message ? 
        <Alert message={message}
            onDeleteAlert={() => {
                setMessage('')
                setMessageStatus('')
            }} 
            messageStatus={messageStatus}/> : ''

    return (
      <div className="register">
          {loading ? <Preloader/> : ''}

          <form className="form" onSubmit={register}>

            <div className="form-field">
                <div className="form-field__icon">
                    <i className="material-icons">person</i>
                </div>
                <input placeholder="First name"
                    value={firstname}
                    required 
                    onChange={e => setFirstname(e.target.value)}/>
            </div>

            <div className="form-field">
                <div className="form-field__icon">
                    <i className="material-icons">person</i>
                </div>
                <input placeholder="Last name"
                    value={lastname}
                    required
                    onChange={e => setLastname(e.target.value)}/>
            </div>

            <div className="form-field">
                <div className="form-field__icon">
                    <i className="material-icons">email</i>
                </div>
                <input placeholder="Email"
                    value={email}
                    required
                    type="email"
                    onChange={e => setEmail(e.target.value)}/>
            </div>

            <div className="form-field">
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
                    value={password}
                    required
                    onChange={e => setPassword(e.target.value)}/>
            </div>
            {alertMessage ? '' : <br/>}
            {alertMessage}
            <div className="flex align-center justify-end">
                <button className="btn primary"
                    disabled={loading} 
                    type="submit">Register</button>
            </div>

          </form>
          <Author/>
      </div>
    )
}

export default Register

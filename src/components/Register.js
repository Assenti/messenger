import React, { useState } from 'react'
import Alert from './Alert'

const Register = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [messageStatus, setMessageStatus] = useState('')

    const register = async (e) => {
        e.preventDefault()
        if (!!firstname && 
            !!lastname &&
            !!email &&
            !!phone &&
            !!password
            ) {
            try {
                // const res = await axios.post('http://localhost:3001/api/register', {
                //     firstname: this.state.firstname,
                //     lastname: this.state.lastname,
                //     email: this.state.email,
                //     phone: this.state.phone,
                //     password: this.state.password
                // })
                // console.log(res)
            } catch (e) {
                console.log(e)
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
                <input placeholder="Phone"
                    value={phone}
                    required
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
            <br/>
            {alertMessage}
            <div className="flex align-center justify-end">
                <button className="btn primary" type="submit">Register</button>
            </div>

          </form>
      </div>
    )
}

export default Register

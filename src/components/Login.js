import React, { useState } from 'react'
import Alert from './Alert'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signIn } from '../actions/authActions'

const Login = () => {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [messageStatus, setMessageStatus] = useState('')

    let alertMessage = message ? 
        <Alert message={message}
            deleteAlert={() => {
                setMessage('')
                setMessageStatus('')
            }} 
            messageStatus={messageStatus}/> : ''

    return (
      <div className="register">
          <form className="form" onSubmit={e => {
              e.preventDefault()
              signIn(email, phone, password)
          }}>

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

            {alertMessage}

            <div className="flex align-center justify-end">
                <button className="btn primary" type="submit">Log in</button>
            </div>

          </form>
      </div>
    )
}

export default Login
  
// const mapDispatchToProps = dispatch => { 
//     return {
//         signIn: () => dispatch(signIn()),
//         dispatch
//     }
//  }
  
// export default connect(
//     null,
//     mapDispatchToProps
// )(Login)

import React, { useState } from 'react'
import Register from './Register'
import Login from './Login'

const Auth = () => {
    const [currentForm, setCurrentForm] = useState('login')
    const [currentFormTitle, setCurrentFormTitle] = useState('Log in')
    const [toGoLink, setToGoLink] = useState("Don't have an account?")

    const toggleForms = () => {
        let form = currentForm === 'login' ? 'register' : 'login'
        setCurrentForm(form)
        setCurrentFormTitle(form === 'login' ? 'Log in' : 'Register')
        setToGoLink(form === 'login' ? "Don't have an account?" : 'Have an account yet?')
    }

    const goToLogin = () => {
      setCurrentForm('login')
      setCurrentFormTitle('Log in')
      setToGoLink("Don't have an account?")
    }
  
    return (
      <div className="auth">
          <div className="auth-block">
            <div className="auth-title">Messenger</div>
            <div className="register-title">
              {currentFormTitle}
              <div className="register-link" onClick={toggleForms}>{toGoLink}</div>
            </div>
            {currentForm === 'login' ? <Login/> : <Register onRegister={goToLogin}/>}
          </div>
      </div>
    )
}

export default Auth

import React, { Component } from 'react'
import { Register } from './Register'
import { Login } from './Login'

export class Auth extends Component {
  constructor() {
    super()

    this.state = {
      currentForm: 'login'
    }

    this.toggleForms = this.toggleForms.bind(this)
  }

  toggleForms(form) {
    this.setState({ currentForm: form })
  }
  
  render() {
    const current = this.state.currentForm === 'login' ? 
                  <Login toggleForms={this.toggleForms}/> : 
                  <Register toggleForms={this.toggleForms}/>

    return (
      <div className="auth">
          <div className="auth-block">
            <div className="auth-title">Messenger</div>
            {current}
          </div>
      </div>
    )
  }
}

export default Auth

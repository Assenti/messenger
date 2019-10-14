import React, { Component } from 'react'
import axios from 'axios'

export class Login extends Component {
  constructor() {
    super()

    this.state = {
        email: '',
        phone: '',
        password: '',
        message: '',
        messageStatus: 'error'
    }

    this.login = this.login.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.goToRegister = this.goToRegister.bind(this)

  }

  async login(e) {
    e.preventDefault()
    if ((!!this.state.email ||
        !!this.state.phone) &&
        !!this.state.password
        ) {
            try {
                const res = await axios.post('http://localhost:3001/api/login', {
                    email: this.state.email,
                    phone: this.state.phone,
                    password: this.state.password
                })
                console.log(res)
                this.message = 'Logged in'
                this.messageStatus = 'success'
            } catch (e) {
                console.log(e)
                this.message = e.response.data
            }
        }
  }

  handleChange(e) {
    switch (e.target.name) {
        case 'email':
            this.setState({ email: e.target.value })
            break
        case 'phone': 
            this.setState({ phone: e.target.value })
            break
        case 'password':
            this.setState({ password: e.target.value })
            break
        default: 
            break
    }
  }


  goToRegister() {
    this.props.toggleForms('register')
  }

  render() {
    return (
      <div className="register">
          <div className="register-title">
            Log in
            <div className="register-link" onClick={this.goToRegister}>Don't have an account?</div>
          </div>
          <form className="form" onSubmit={this.login}>

            <div className="form-field">
                <div className="form-field__icon">
                    <i className="material-icons">email</i>
                </div>
                <input placeholder="Email"
                    disabled={!!this.state.phone}
                    name="email"
                    onChange={this.handleChange}/>
            </div>
            
            <div className="form-field">
                <div className="form-field__icon">
                    <i className="material-icons">smartphone</i>
                </div>
                <input placeholder="Phone"
                    disabled={!!this.state.email}
                    name="phone"
                    onChange={this.handleChange}/>
            </div>

            <div className="form-field">
                <div className="form-field__icon">
                    <i className="material-icons">lock</i>
                </div>
                <input placeholder="Password" 
                    type="password"
                    name="password"
                    onChange={this.handleChange}/>
            </div>
            <br/>

            <div className={"alert " + this.messageStatus }>{ this.state.message }</div>

            <div className="flex align-center justify-end">
                <button className="btn primary" type="submit">Log in</button>
            </div>

          </form>
      </div>
    )
  }
}

export default Login

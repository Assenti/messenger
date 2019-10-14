import React, { Component } from 'react'
import axios from 'axios'

export class Register extends Component {
  constructor() {
    super()

    this.state = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: ''
    }

    this.register = this.register.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.goToLogin = this.goToLogin.bind(this)
  }

  async register(e) {
    e.preventDefault()
    if (!!this.state.firstname && 
        !!this.state.lastname &&
        !!this.state.email &&
        !!this.state.phone &&
        !!this.state.password
        ) {
            try {
                const res = await axios.post('http://localhost:3001/api/register', {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    phone: this.state.phone,
                    password: this.state.password
                })
                console.log(res)
            } catch (e) {
                console.log(e)
            }
        }
  }

  handleChange(e) {
    switch (e.target.name) {
        case 'firstname': 
            this.setState({ firstname: e.target.value })
            break
        case 'lastname': 
            this.setState({ lastname: e.target.value })
            break
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

  goToLogin() {
      this.props.toggleForms('login')
  }

  render() {
    return (
      <div className="register">
          <div className="register-title">
              Register
              <div className="register-link" onClick={this.goToLogin}>Have an account yet?</div>
          </div>
          <form className="form" onSubmit={this.register}>

            <div className="form-field">
                <div className="form-field__icon">
                    <i className="material-icons">person</i>
                </div>
                <input placeholder="First name"
                    name="firstname" 
                    onChange={this.handleChange}/>
            </div>

            <div className="form-field">
                <div className="form-field__icon">
                    <i className="material-icons">person</i>
                </div>
                <input placeholder="Last name"
                    name="lastname"
                    onChange={this.handleChange}/>
            </div>

            <div className="form-field">
                <div className="form-field__icon">
                    <i className="material-icons">email</i>
                </div>
                <input placeholder="Email"
                    name="email"
                    onChange={this.handleChange}/>
            </div>

            <div className="form-field">
                <div className="form-field__icon">
                    <i className="material-icons">smartphone</i>
                </div>
                <input placeholder="Phone"
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
            <div className="flex align-center justify-end">
                <button className="btn primary" type="submit">Register</button>
            </div>

          </form>
      </div>
    )
  }
}

export default Register

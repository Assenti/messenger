import React, { Component } from 'react'

export class ActiveChatInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.clearMessage = this.clearMessage.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    handleChange(e) {
        this.setState({message: e.target.value})
    }

    sendMessage(e) {
        console.log(this.state.message)
        e.preventDefault()
        this.clearMessage()
    }

    clearMessage() {
        this.setState({ message: '' })
    }

    render() {
        return (
        <form className="active-chat__input" 
            onSubmit={this.sendMessage}>
            <input value={this.state.message}
                onChange={this.handleChange}/>
            <button className="btn secondary"
                type="submit" 
                onClick={this.sendMessage}>send</button>
        </form>
        )
    }
}

export default ActiveChatInput

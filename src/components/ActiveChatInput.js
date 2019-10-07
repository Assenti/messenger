import React, { Component } from 'react'

export class ActiveChatInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.clearMessage = this.clearMessage.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    handleChange(e) {
        this.setState({message: e.target.value})
    }

    handleInput(e) {
        e.preventDefault()
        this.props.onMessageInput(this.state.message)
        this.clearMessage()
    }

    clearMessage() {
        this.setState({ message: '' })
    }

    render() {
        return (
        <form className="active-chat__input" 
            onSubmit={this.handleInput}>
            <input value={this.state.message}
                onChange={this.handleChange}/>
            <button className="btn secondary"
                type="submit" 
                onClick={this.handleInput}>send</button>
        </form>
        )
    }
}

export default ActiveChatInput

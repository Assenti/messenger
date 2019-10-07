import React, { Component } from 'react'
import { ActiveChatInput } from './ActiveChatInput'
import mockAvatar from '../img/man.png'

export class ActiveChat extends Component {

  constructor() {
    super()

    this.state = {
      messages: [
        { id: 1, createdAt: '2019-10-06 20:01:00', text: 'Some bla bla bla', sender: 'John Doe', avatar: mockAvatar },
        { id: 2, createdAt: '2019-10-06 20:01:00', text: 'Some bla bla bla', receiver: 'Anna Smith', avatar: mockAvatar },
        { id: 3, createdAt: '2019-10-06 20:01:00', text: 'Some bla bla bla', sender: 'John Doe', avatar: mockAvatar },
        { id: 4, createdAt: '2019-10-06 20:01:00', text: 'Some bla bla bla', receiver: 'Anna Smith', avatar: mockAvatar },
        { id: 5, createdAt: '2019-10-06 20:01:00', text: 'Some bla bla bla', sender: 'John Doe', avatar: mockAvatar },
        { id: 6, createdAt: '2019-10-06 20:01:00', text: 'Some bla bla bla', receiver: 'Anna Smith', avatar: mockAvatar },
        { id: 7, createdAt: '2019-10-06 20:01:00', text: 'Some bla bla bla', sender: 'John Doe', avatar: mockAvatar },
        { id: 8, createdAt: '2019-10-06 20:01:00', text: 'Some bla bla bla', receiver: 'Anna Smith', avatar: mockAvatar },
        { id: 9, createdAt: '2019-10-06 20:01:00', text: 'Some bla bla bla', sender: 'John Doe', avatar: mockAvatar },
        { id: 10, createdAt: '2019-10-06 20:01:00', text: 'Some bla bla bla', receiver: 'Anna Smith', avatar: mockAvatar },
        { id: 11, createdAt: '2019-10-06 20:01:00', text: 'Some bla bla bla', sender: 'John Doe', avatar: mockAvatar },
        { id: 12, createdAt: '2019-10-06 20:01:00', text: 'Some bla bla bla Last msg', receiver: 'AnnaBannd SmithSmith', avatar: mockAvatar }
    ]
  }

    this.handleNewMessage = this.handleNewMessage.bind(this)
  }
  
  handleNewMessage = (message) => {
    let id = parseInt(Math.random() * 1000)
    let _messages = this.state.messages
    _messages.unshift({ id: id, text: message })
    this.setState({
      messages: _messages
    })
  }

  render() {
    return (
      <div className="active-chat">
          <div className="active-chat__toolbar">
              <div className="active-chat__toolbar-title">Chat One</div>
              <div className="icon__btn">
                <i className="material-icons">more_vert</i>
              </div>
          </div>
          <div className="active-chat__body">
          <div className="chat-messages">
                {this.state.messages.map( msg => {
                      return <div className={`chat-messge__container ${msg.receiver ? 'receiver': ''}`}>
                          <div className={`chat-message ${msg.sender ? 'sender' : 'receiver'}`} key={msg.id}>
                              <div className="chat-message__icon">
                                  <img src={msg.avatar} alt={msg.avatar}/>
                                  <div>{ msg.receiver ? msg.receiver : msg.sender }</div>
                              </div>
                              <div className="chat-message__text">
                                  <div>{msg.text}</div>
                                  <div>{msg.createdAt}</div>
                              </div>
                          </div>
                      </div>
                  })}
            </div>
          </div>
          <ActiveChatInput onMessageInput={this.handleNewMessage}/>
      </div>
    )
  }
}

export default ActiveChat

import React, { Component } from 'react'
import mockAvatar from '../img/man.png'

export class ChatMessages extends Component {
  state = {
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

  render() {
    return (
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
    )
  }
}

export default ChatMessages

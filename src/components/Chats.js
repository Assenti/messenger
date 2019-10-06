import React, { Component } from 'react'
import mockIcon from '../img/logo192.png'

export class Chats extends Component {
  state = {
      chats: [
          { name: 'Chat one', icon: mockIcon },
          { name: 'Chat two', icon: mockIcon },
          { name: 'Chat three', icon: mockIcon },
          { name: 'Chat four', icon: mockIcon },
          { name: 'Chat five', icon: mockIcon },
          { name: 'Chat six', icon: mockIcon }
      ]
  }

  render() {
    return (
      <div className="chats">
        <div className="chats__toolbar">
            <div className="chats__toolbar-title">Your chats</div>
            <button className="btn primary">new chat</button>
        </div>
        <div className="chats__body">
            {this.state.chats.map((chat, index) => {
                return <div className={`chats__chat ${chat.name === 'Chat one' ? 'chosen' : ''}`} key={index}>
                    <div className="flex">
                        <img className="chats__chat-icon" src={chat.icon} alt={chat.icon}/>
                        <div>{chat.name}</div>
                    </div>
                </div>
            })}
        </div>
      </div>
    )
  }
}

export default Chats

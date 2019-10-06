import React, { Component } from 'react'
import { ActiveChatInput } from './ActiveChatInput'
import { ChatMessages } from './ChatMessages'

export class ActiveChat extends Component {
  state = {
      
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
            <ChatMessages/>
          </div>
          <ActiveChatInput/>
      </div>
    )
  }
}

export default ActiveChat

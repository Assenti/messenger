import React, { Component } from 'react'
import './styles/all.scss'
import { AppHeader } from './components/AppHeader'
import { Chats } from './components/Chats'

class App extends Component {
  
  render() {
    return (
      <div className="app">
        <div className="app-container">
          <AppHeader/>
          <div className="flex">
            <Chats/>
          </div>
        </div>
      </div>
    )
  }
}

export default App

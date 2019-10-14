import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
  // Link
} from "react-router-dom"
import './styles/all.scss'
import { AppHeader } from './components/AppHeader'
import { Chats } from './components/Chats'
import { ActiveChat } from './components/ActiveChat'
import { Auth } from './components/Auth'

class App extends Component {
  
  render() {
    return (
      <div className="app">
        <div className="app-container">
          <Router>
            <Switch>
              <Route path="/auth">
                <Auth/>
              </Route>
              <Route path="/">
                <AppHeader/>
                <div className="flex space-between full-width">
                  <Chats/>
                  <ActiveChat/>
                </div>
              </Route>
              <Route path="*">
                <Redirect to="/"/>
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

export default App

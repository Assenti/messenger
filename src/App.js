import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { useSelector } from 'react-redux'

/** Components */
import AppHeader from './components/AppHeader'
import Chats from './components/Chats'
import ActiveChat from './components/ActiveChat'
import Auth from './components/Auth'

const App = () => {
    const isLoggedIn = useSelector(state => state.auth.isLogged)

    return (
        <div className="app">
            <div className="app-container">
                <Router>
                    <Switch>
                        <Route exact path="/auth">
                            { isLoggedIn ? <Redirect to="/" /> : <Auth/> }
                        </Route>
                        <PrivateRoute path="/">
                            <AppHeader/>
                            <div className="flex space-between full-width">
                                <Chats/>
                                <ActiveChat/>
                            </div>
                        </PrivateRoute>
                        <Route path="*">
                            <Redirect to="/"/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    )
}

const PrivateRoute = ({ children, ...rest }) => {
    const isLoggedIn = useSelector(state => state.auth.isLogged)
    
    return (
        <Route
        {...rest}
        render={({ location }) => isLoggedIn ? (children) : (
            <Redirect
                to={{
                    pathname: "/auth",
                    state: { from: location }
                }}
            />)
        }
        />
    )
}

export default App

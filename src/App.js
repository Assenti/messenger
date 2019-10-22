import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserChats } from './actions/chatActions'

/** Components */
import AppHeader from './components/AppHeader'
import Main from './components/Main'
import Auth from './components/Auth'

const App = () => {
    const isLoggedIn = useSelector(state => state.auth.isLogged)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserChats())
    })

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
                            <Main/>
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

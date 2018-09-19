/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import './style.scss'
import Home from './containers/home/home'
import Users from './containers/users/users'
import UserForm from './containers/users/userform'


class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/users" component={Users} />
                    <Route render={() => <h1>404 Error</h1>} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(App)

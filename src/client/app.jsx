/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './style.scss'
import Home from './containers/home/home'
import Users from './containers/users/users'

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/users" component={Users} />
                    <Route render={() => <h1>404 Error</h1>} />
                </Switch>
            </Router>
        )
    }
}

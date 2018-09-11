import React, { Component } from 'react'
import Navigation from '../../components/navigation'

export default class Users extends Component {
    render() {
        return (
            <div>
                <h1>Users Component</h1>
                <Navigation
                    items={[
                        { path: '/', name: 'Home' },
                        { path: '/users', name: 'Users' }
                    ]}
                />
            </div>)
    }
}

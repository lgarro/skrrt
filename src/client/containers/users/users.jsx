import React, { Component, Fragment } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { setAppUsers as setAppUsersCreator } from '../../redux/actionCreators'
import Navigation from '../../components/navigation'
import UserForm from './userform'

type Props = {
    skrrtApp: Object,
    setAppUsers: ()=>void
}
class Users extends Component<Props> {
    componentWillMount() {
        this.fetchUserList()
    }
    subRoutes = [
        { path: '/add', component: UserForm, exact: true }
    ]
fetchUserList = async () => {
    const { setAppUsers } = this.props
    const usersResponse = await axios.get('api/users')
    const userList = usersResponse.data.length ? usersResponse.data : []
    setAppUsers(userList)
}
render() {
    const { skrrtApp } = this.props
    return (
        <div>
            <h1>Users Component</h1>
            <Navigation
                items={[
                    { path: '/', name: 'Home' },
                    { path: '/users', name: 'Users' }
                ]}
            />
            <Link to="/users/add">Add User</Link>
            {skrrtApp.users && skrrtApp.users.length &&
                 <Fragment>
                     <h1>Users list</h1>
                     <ul>
                         {skrrtApp.users
                             .map(user =>
                                 <li key={user.email}>{user.name} - {user.email}</li>)}
                     </ul>
                 </Fragment>}


            <br />
            <br />
            {this.subRoutes.map(route => (
                <Route
                    key={route.path}
                    path={`/users${route.path}`}
                    component={route.component}
                />
            ))}
        </div>)
}
}

// eslint-disable-next-line
const mapStateToProps = state => {
    return {
        skrrtApp: state
    }
}
const connector = connect(
    mapStateToProps,
    dispatch => ({
        setAppUsers: message => dispatch(setAppUsersCreator(message))
    })
)

export default withRouter(connector(Users))

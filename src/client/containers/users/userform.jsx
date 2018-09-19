import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { setAppUsers as setAppUsersCreator } from '../../redux/actionCreators'

type Props = {
    setAppUsers:()=>void
}

class UserForm extends Component<Props> {
    state = {
        type: 'add',
        form: {
            email: '',
            name: '',
            age: ''
        }
    }
handleInputChange = (e) => {
    e.preventDefault()
    this.setState({
        ...this.state,
        form: {
            ...this.state.form,
            [e.target.name]: e.target.value
        }
    })
}
handleSubmit=async (e) => {
    const { history, setAppUsers } = this.props
    e.preventDefault()
    const newUser = {
        email: this.state.form.email,
        name: this.state.form.name,
        age: this.state.form.age
    }
    await axios.post('/api/users', newUser)
    const updatedUserList = await axios.get('/api/users')
    setAppUsers(updatedUserList.data)
    history.push('/users')
}

render() {
    return (
        <div>
            <h1>User Form</h1>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="emailField">Enter email</label>
                <input id="emailField" name="email" type="email" value={this.state.form.email} onChange={this.handleInputChange} />
                <br />
                <label htmlFor="nameField">Enter name</label>

                <input id="nameField" name="name" type="text" value={this.state.form.name} onChange={this.handleInputChange} />
                <br />

                <label htmlFor="ageField">Enter age</label>

                <input id="ageField" name="age" type="number" value={this.state.form.age} onChange={this.handleInputChange} />
                <br />

                <button type="submit">{this.state.type === 'add' ? 'Add user' : 'Edit User'}</button>
            </form>

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

export default withRouter(connector(UserForm))


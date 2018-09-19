import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import Navigation from '../../components/navigation'
import { setAppWelcomeMessage } from '../../redux/actionCreators'

type Props = {
    skrrtApp: Object,
    setWelcomeMessage: ()=>void
}


class Home extends Component<Props> {
    componentDidMount() {
        this.callApi()
    }

    callApi = async () => {
        const { setWelcomeMessage } = this.props
        const response = await axios.get('api/static')
        setWelcomeMessage(response.data.description)
    }

    render() {
        const { skrrtApp } = this.props
        return (
            <Fragment>
                <h1>Home Component</h1>
                <Navigation
                    items={[
                        { path: '/', name: 'Home' },
                        { path: '/users', name: 'Users' }
                    ]}
                />
                <StyledMessage>
                    {skrrtApp.welcomeMessage}
                </StyledMessage>
            </Fragment>
        )
    }
}

const StyledMessage = styled.p`
font-size: 15px;
color: green;
`

// eslint-disable-next-line
const mapStateToProps = state => {
    return {
        skrrtApp: state
    }
}
const connector = connect(
    mapStateToProps,
    dispatch => ({
        setWelcomeMessage: message => dispatch(setAppWelcomeMessage(message))
    })
)

export default withRouter(connector(Home))

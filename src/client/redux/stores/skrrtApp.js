import { SET_WELCOME_MESSAGE, SET_APP_USERS } from './../actionTypes'

const initialState = {
    welcomeMessage: 'Default Welcome message, please set one',
    users: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
    case SET_WELCOME_MESSAGE:
        return Object.assign({}, state, {
            welcomeMessage: action.message
        })
    case SET_APP_USERS:
        return Object.assign({}, state, {
            users: action.users
        })
    default:
        return state
    }
}

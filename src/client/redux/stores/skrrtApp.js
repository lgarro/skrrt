import { SET_WELCOME_MESSAGE } from './../actionTypes'

const initialState = {
    welcomeMessage: 'Default Welcome message, please set one'
}

export default (state = initialState, action) => {
    switch (action.type) {
    case SET_WELCOME_MESSAGE:
        return Object.assign({}, state, {
            welcomeMessage: action.message
        })
    default:
        return state
    }
}

import { SET_WELCOME_MESSAGE, SET_APP_USERS } from './actionTypes'

export const setAppWelcomeMessage = message => ({
    type: SET_WELCOME_MESSAGE,
    message
})
export const setAppUsers = users => ({
    type: SET_APP_USERS,
    users
})

import { combineReducers } from 'redux'
import skrrtAppReducer from './stores/skrrtApp'

export default combineReducers({
    // add app reducers here
    skrrtApp: skrrtAppReducer
})

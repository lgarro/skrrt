import { combineReducers } from 'redux'
import { routerReducer as router } from 'connected-react-router'
import skrrtAppReducer from './stores/skrrtApp'

export default combineReducers({
    // add app reducers here
    router,
    skrrtApp: skrrtAppReducer
})
